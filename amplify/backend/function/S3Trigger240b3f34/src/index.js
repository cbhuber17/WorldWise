const aws = require("aws-sdk");
const sharp = require("sharp");
const s3 = new aws.S3();

exports.handler = async function (event, context) {
  console.log("Received S3 event:", JSON.stringify(event, null, 2));

  // Only handle new objects being created
  if (event.Records[0].eventName === "ObjectRemoved:Delete") {
    return;
  }

  // Get the S3 bucket and key
  const bucket = event.Records[0].s3.bucket.name;
  const key = decodeURIComponent(event.Records[0].s3.object.key);
  console.log(`Bucket: ${bucket}`, `Key: ${key}`);

  try {
    // Get image from s3
    let image = await s3.getObject({ Bucket: bucket, Key: key }).promise();

    // Get image info
    image = await sharp(image.Body);
    const metadata = await image.metadata();

    // Resize
    if (metadata.width > 300) {
      const resizedImage = await image
        .resize({ width: 40, height: 40 })
        .withMetadata()
        .toBuffer();

      console.log("Sharp Resized Image");

      // Store image in S3
      await s3
        .putObject({ Bucket: bucket, Key: key, Body: resizedImage })
        .promise();

      return "RESIZED IMAGE";
    } else {
      console.log("NOT RESIZED IMAGE");
      return "NOT RESIZED IMAGE";
    }
  } catch (err) {
    context.fail(`Error resizing image: ${err}`);
  }
};
