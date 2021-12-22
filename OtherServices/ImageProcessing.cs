using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.IO;
using System.Linq;
using System.Web;

namespace TgiApplications.OtherServices
{
    public static class ImageProcessing
    {
        public static string imageExtension = "";
        public static string UploadedImages(string ImgEncoder, string ImageNewName)
        {   string fileNameWitPath = "";
            string fileNametemp = "";
            var filePath = HttpContext.Current.Server.MapPath("~/UploadedImages/");
            var result = "failure";
            if (ImgEncoder.Contains("data:image/png"))
            {
                fileNameWitPath = (filePath + (ImageNewName + ".png"));
                fileNametemp = (filePath + "temp.png");
                ImageNewName = (ImageNewName + ".png");
                imageExtension = ".png";
            }
            else if (ImgEncoder.Contains("data:image/jpeg"))
            {
                fileNameWitPath = (filePath + (ImageNewName + ".jpeg"));
                fileNametemp = (filePath + "temp.jpeg");
                ImageNewName = (ImageNewName + ".jpeg");
                imageExtension = ".jpeg";
            }
            else if (ImgEncoder.Contains("data:image/gif"))
            {
                fileNameWitPath = (filePath + (ImageNewName + ".gif"));
                fileNametemp = (filePath + "temp.gif");
                ImageNewName = (ImageNewName + ".gif");
                imageExtension = ".gif";
            }

            byte[] data;
            string convert__1 = String.Empty;
            if ((File.Exists(fileNameWitPath) == true))
            {
                File.Delete(fileNameWitPath);
            }

            if ((fileNametemp != ""))
            {
                using (FileStream fs = new FileStream(fileNametemp, FileMode.Create))
                {
                    using (BinaryWriter bw = new BinaryWriter(fs))
                    {
                        if (ImgEncoder.Contains("data:image/png"))
                        {
                            convert__1 = ImgEncoder.Replace("data:image/png;base64,", String.Empty);
                            data = Convert.FromBase64String(convert__1);
                            bw.Write(data);
                        }
                        else if (ImgEncoder.Contains("data:image/jpeg"))
                        {
                            convert__1 = ImgEncoder.Replace("data:image/jpeg;base64,", String.Empty);
                            data = Convert.FromBase64String(convert__1);
                            bw.Write(data);
                        }
                        else if (ImgEncoder.Contains("data:image/gif"))
                        {
                            convert__1 = ImgEncoder.Replace("data:image/gif;base64,", String.Empty);
                            data = Convert.FromBase64String(convert__1);
                            bw.Write(data);
                        }
                        result = "success";
                    }
                    fs.Dispose();
                    fs.Close();
                }

                
            }

            if ((File.Exists(fileNametemp) == true))
            {
                string res = String.Empty;
                FileStream fs = File.OpenRead(fileNametemp);
                if ((ReducePassport(fileNameWitPath, fs) == "1"))
                {
                    //r = "1";
                }
                else
                {
                    //res = R;
                    //r = "0";
                }

                fs.Dispose();
                fs.Close();
                File.Delete(fileNametemp);
            }
            //return result;
            return imageExtension;
        }
        public static string ReducePassport(string destpa, FileStream fContent)
        {
            string res = String.Empty;
            try
            {
                Bitmap originalBMP = new Bitmap(fContent);
                int origWidth = originalBMP.Width;
                int origHeight = originalBMP.Height;
                int sngRatio = (origWidth / origHeight);
                int newWidth = 100;
                int newHeight = 100;
                //  Create a new bitmap which will hold the previous resized bitmap
                Bitmap newBMP = new Bitmap(originalBMP, newWidth, newHeight);
                //  Create a graphic based on the new bitmap
                Graphics oGraphics = Graphics.FromImage(newBMP);
                oGraphics.CompositingQuality = CompositingQuality.HighQuality;
                oGraphics.SmoothingMode = SmoothingMode.HighQuality;
                oGraphics.InterpolationMode = InterpolationMode.HighQualityBicubic;
                //  Draw the new graphic based on the resized bitmap
                oGraphics.DrawImage(originalBMP, 0, 0, newWidth, newHeight);
                //  Save the new graphic file to the server
                newBMP.Save(destpa);
                res = "1";
            }
            catch (Exception ex)
            {
                res = "0";
                ex.ToString();
            }

            return res;
        }
    }
}