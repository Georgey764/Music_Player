package app.musify.george;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

@SpringBootApplication
public class MusicPlayerBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(MusicPlayerBackendApplication.class, args);
	}

//	@Bean
//	public CommandLineRunner commandLineRunner(String[] args){
//		return ((runner)-> {
//			System.out.println("hi");
//		});
//	}

}
