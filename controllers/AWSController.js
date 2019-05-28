require("dotenv").config();
const AWS = require("aws-sdk");
const fs = require("fs");
const fileType = require("file-type");
const bluebird = require("bluebird");
const multiparty = require("multiparty");
class AWSController {
  /**
   * upload the image to AWS S3 Bucket
   * @param {*} req
   * @param {*} res
   */
  awsUploadImage(req, res) {
    // configure the keys for accessing AWS
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
      region: process.env.AWS_REGION
    });

    // configure AWS to work with promises
    AWS.config.setPromisesDependency(bluebird);

    // create S3 instance
    const s3 = new AWS.S3();

    const uploadFile = (buffer, name, type) => {
      const params = {
        ACL: "public-read",
        Body: buffer,
        Bucket: process.env.AWS_BUCKET,
        ContentType: type.mime,
        Key: `${name}.${type.ext}`
      };
      return s3.upload(params).promise();
    };

    const form = new multiparty.Form();
    const userId = req.params.userId;
    console.log(userId);
    form.parse(req, async (error, fields, files) => {
      if (error) throw new Error(error);
      try {
        const path = files.file[0].path;
        console.log(path);

        const buffer = fs.readFileSync(path);

        const type = fileType(buffer);
        console.log(type);
        // const timestamp = Date.now().toString();
        const image = `IMG${userId}`;
        console.log(image);
        const fileName = `podhubBucket/${image}`;
        const data = await uploadFile(buffer, fileName, type);
        return res.status(200).send(data);
      } catch (error) {
        return res.status(400).send(error);
      }
    });
  }

  /**
   * Get the image url from AWS S3 Bucket
   * @param {*} req
   * @param {*} res
   */
  awsGetImageUrl(req, res) {
    console.log("test url");
    // configure the keys for accessing AWS
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
      region: process.env.AWS_REGION
    });

    // configure AWS to work with promises
    AWS.config.setPromisesDependency(bluebird);

    // create S3 instance
    const s3 = new AWS.S3();

    var params = {
      Bucket: process.env.AWS_BUCKET,
      Key: `podhubBucket/IMG${req.params.userId}.png`
      // Key: `podhubBucket/1.png`
    };
    s3.getObject(params, function(err, data) {
      if(data){
        console.log(data)
        // let type = data.ContentType
        
        let url = `https://podhub-user-images.s3.amazonaws.com/podhubBucket/IMG${req.params.userId}.png`
        res.json({ url: url });
      }
      else{
        res.json({ url: data });
      }
    });
  }
}
module.exports = AWSController;
