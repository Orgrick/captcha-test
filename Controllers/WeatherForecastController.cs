using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IO;

namespace WebApplication2.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            int width = 100;
            int height = 36;
            var captchaCode = Captcha.GenerateCaptchaCode();
            var result = Captcha.GenerateCaptchaImage(width, height, captchaCode);
            HttpContext.Session.SetString("key", result.CaptchaCode);
            string validKey = HttpContext.Session.GetString("key");
            Stream s = new MemoryStream(result.CaptchaByteData);
            return new FileStreamResult(s, "image/png");
        }

        [HttpPost]
        public IActionResult Post([FromBody] string key)
        {
            string validKey = HttpContext.Session.GetString("key");
            if (validKey == key)
            {
                return Ok(new { success = true });
            }
            return Ok(new { success = false });
        }
    }
}
