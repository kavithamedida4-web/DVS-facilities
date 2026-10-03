import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const accountId = process.env.CLOUDFLARE_ACCOUNT_ID || "0069ef7d5a396094dfe7dace3a03a16c";
const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || "d8fccbe37dd62b88de759dba6f478427";
const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || "71facf1b5d79bc523598defcd4c162f5347462e53878428f4b4ee48fc98717b2";
const bucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME || "mechanic-images";
const publicUrl = (process.env.CLOUDFLARE_R2_PUBLIC_URL || "https://pub-f471c3e24db144a6a94c290eececee02.r2.dev").replace(/\/$/, "");

// Initialize S3Client for Cloudflare R2
const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

/**
 * Uploads a product image strictly to Cloudflare R2 bucket and returns its public URL
 */
export async function uploadProductImageToR2(
  buffer: Buffer,
  filename: string,
  contentType: string = "image/jpeg"
): Promise<string> {
  const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.-]/g, "_");
  const uniqueKey = `products/${Date.now()}-${sanitizedFilename}`;

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: uniqueKey,
    Body: buffer,
    ContentType: contentType,
  });

  await r2Client.send(command);

  return `${publicUrl}/${uniqueKey}`;
}
