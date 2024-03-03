package app.musify.george;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class MainRestController {

    @GetMapping("/getSongHTML")
    public String getSongHTML(@RequestParam(required = true) String search_query){
        String[] splitQuery = search_query.split(" ");
        String finalQuery = String.join("+", splitQuery);
        try {
            URL url = new URL("https://www.youtube.com/results?search_query=" + finalQuery);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestProperty("User-Agent", "Chrome");
            connection.setRequestMethod("GET");

            BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String inputLine;

            StringBuilder watch = new StringBuilder();

            while((inputLine = reader.readLine()) != null){
                if(inputLine.contains("/watch?v=")){
                    watch.append(inputLine);
                }
            }
            String links = watch.toString();
            int firstIndex = links.indexOf("/watch?v=");
            String linkPartOne = links.substring(firstIndex);
            String link = "https://www.youtube.com" + linkPartOne.substring(0, linkPartOne.indexOf("\""));
            return link;
        } catch (IOException e) {
            System.out.println(e);
        }
        return "Not Found";
    }

}
