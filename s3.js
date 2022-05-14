import aws from 'aws-sdk'

const region = process.env.REGION;
const bucketName = process.env.BUCKETNAME; 
const accessKeyId = process.env.ACCESSKEYID; 
const secretAccessKey = process.env.SECRETACCESSKEY; 

const s3 = new aws.S3({
    region,
    accessKeyId, 
    secretAccessKey,
    signatureVersion: '4'
})