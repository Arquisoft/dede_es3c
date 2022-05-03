import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class Login extends Simulation {

  private val httpProtocol = http
    .baseUrl("http://localhost:3000")
    .inferHtmlResources(AllowList(), DenyList(""".*\.js""", """.*\.css""", """.*\.gif""", """.*\.jpeg""", """.*\.jpg""", """.*\.ico"""))
    .acceptHeader("*/*")
    .acceptEncodingHeader("gzip, deflate")
    .acceptLanguageHeader("es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3")
    .userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:86.0) Gecko/20100101 Firefox/86.0")
  
  private val headers_0 = Map(
  	"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  	"Upgrade-Insecure-Requests" -> "1"
  )
  
  private val headers_1 = Map(
    "Accept" -> "image/avif,image/webp,*/*")
  
  private val headers_2 = Map(
  	"If-None-Match" -> """W/"21-Da2z2ryWGAvtwohXYJERIWJgKbU"""",
  	"Origin" -> "http://localhost:3000"
  )
  
  private val headers_3 = Map(
  	"Access-Control-Request-Headers" -> "content-type",
  	"Access-Control-Request-Method" -> "POST",
  	"Origin" -> "http://localhost:3000"
  )
  
  private val headers_4 = Map(
  	"Content-Type" -> "application/json",
  	"Origin" -> "http://localhost:3000"
  )
  
  private val headers_5 = Map(
  	"If-None-Match" -> """W/"2-l9Fw4VUO7kr8CvBlt4zaMCqXZ0w"""",
  	"Origin" -> "http://localhost:3000"
  )
  
  private val uri1 = "localhost"

  private val scn = scenario("Login")
    .exec(
      http("request_0")
        .get("/")
        .headers(headers_0)
    )
    .pause(10)
    .exec(
      http("request_1")
        .options("http://" + uri1 + ":5000/api/login")
        .headers(headers_1)
        .resources(
          http("request_2")
            .options("http://" + uri1 + ":5000/api/login")
            .headers(headers_1),
          http("request_3")
            .post("http://" + uri1 + ":5000/api/login")
            .headers(headers_4)
            .body(RawFileBody("login/0001_request.txt")),
          http("request_4")
            .get("/catalog")
            .headers(headers_5)
        )
    )

	setUp(scn.inject(rampUsers(15).during(60))).protocols(httpProtocol)
}