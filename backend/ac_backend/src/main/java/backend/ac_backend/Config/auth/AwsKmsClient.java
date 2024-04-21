package backend.ac_backend.Config.auth;

import com.amazonaws.services.kms.AWSKMS;
import com.amazonaws.services.kms.AWSKMSClientBuilder;
import com.amazonaws.services.kms.model.DecryptRequest;
import com.amazonaws.services.kms.model.DecryptResult;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import org.springframework.stereotype.Component;

import java.nio.ByteBuffer;
import java.util.Base64;

@Component
public class AwsKmsClient {
    private static final Logger logger = LogManager.getLogger(AwsKmsClient.class);


    //@Value("${kms.keyId}") // The KMS Key ID
    private final String kmsKeyId = "arn:aws:kms:eu-north-1:471112877644:key/e4b8b854-229f-407d-bc08-19d84afabc8c";

    private final AWSKMS kmsClient;

    public AwsKmsClient() {
        // Initialize AWSKMS client
        this.kmsClient = AWSKMSClientBuilder.defaultClient();
    }


    public String decrypt(String ciphertext) {

        ByteBuffer decodedCiphertext = ByteBuffer.wrap(java.util.Base64.getDecoder().decode(ciphertext));

        DecryptRequest decryptRequest = new DecryptRequest()
                .withCiphertextBlob(decodedCiphertext)
                .withKeyId(this.kmsKeyId);

        DecryptResult decryptResult = kmsClient.decrypt(decryptRequest);
        ByteBuffer decryptedData = decryptResult.getPlaintext();
        String base64String = Base64.getEncoder().encodeToString(decryptedData.array());
        logger.info("test" + base64String);
        return base64String;
    }
}

