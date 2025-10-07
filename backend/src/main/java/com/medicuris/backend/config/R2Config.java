package com.medicuris.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.S3Configuration;

import java.net.URI;

@Configuration
public class R2Config {

    @Value("${cloud.r2.access-key}")
    private String accessKey;

    @Value("${cloud.r2.secret-key}")
    private String secretKey;

    @Value("${cloud.r2.endpoint}")
    private String endpoint;

    @Bean
    public S3Client r2S3Client() {
        AwsBasicCredentials creds = AwsBasicCredentials.create(accessKey, secretKey);

        S3Configuration s3config = S3Configuration.builder()
                .pathStyleAccessEnabled(true)
                .build();

        return S3Client.builder()
                .credentialsProvider(StaticCredentialsProvider.create(creds))
                .endpointOverride(URI.create(endpoint))
                .serviceConfiguration(s3config)
                .region(Region.of("auto"))  // region is dummy
                .build();
    }
}
