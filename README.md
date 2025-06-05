# No as a Service - Serverless

A serverless adaptation of the original [No as a Service](https://github.com/hotheadhacker/no-as-a-service) project. This version is built with AWS Lambda, API Gateway, and CloudFront to provide a scalable, cost-effective API that delivers creative and humorous "no" responses from frustrated developers, ops engineers, and cybersecurity professionals.

## 🔗 Original Project

This is an adaptation of the excellent [hotheadhacker/no-as-a-service](https://github.com/hotheadhacker/no-as-a-service) project, redesigned for serverless deployment on AWS with French sarcastic responses tailored for the dev/ops/cybersec community.

## 🚀 Live Service

The service is currently deployed and available at:

**https://no.inosta.cc/no**

Try it out:
```bash
curl https://no.inosta.cc/no
```

## 📋 Features

- **Serverless Architecture**: Built with AWS Lambda and API Gateway
- **Global CDN**: Distributed via CloudFront for low latency
- **Custom Domain**: Available at a memorable URL
- **Sarcastic Responses**: 450+ unique French responses from dev/ops/cybersec perspectives
- **High Availability**: Serverless design ensures 99.9%+ uptime
- **Cost Effective**: Pay only for what you use

## 🛠 Technology Stack

- **Runtime**: Node.js 20.x on ARM64 (Graviton2)
- **Infrastructure**: AWS SAM (Serverless Application Model)
- **Services Used**:
  - AWS Lambda
  - API Gateway v2 (HTTP API)
  - CloudFront Distribution
  - Certificate Manager (SSL/TLS)
  - Route53 (DNS)

## 📁 Project Structure

```
.
├── index.js              # Lambda function handler
├── reasons.json           # Collection of sarcastic responses
├── template.yaml          # SAM infrastructure template
├── samconfig.toml         # SAM deployment configuration
├── package.json           # Node.js dependencies
└── README.md             # This file
```

## 🚀 Deployment Guide

### Prerequisites

1. **AWS CLI** configured with appropriate permissions
2. **AWS SAM CLI** installed
3. **Node.js 18+** installed
4. **Domain ownership** (for custom domain setup)

### Basic Deployment

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd no-as-a-service
   ```

2. **Build the application**:
   ```bash
   sam build
   ```

3. **Deploy to AWS**:
   ```bash
   sam deploy --guided
   ```
   
   Follow the prompts to configure:
   - Stack name (e.g., `no-as-a-service`)
   - AWS Region (e.g., `us-east-1`)
   - Confirm changes before deploy: `Y`
   - Allow SAM to create roles: `Y`
   - Disable rollback: `Y`
   - Function may not have authorization defined: `y`

### Custom Domain Setup (Optional)

To set up a custom domain like `your-domain.com/no`:

1. **Create SSL Certificate** (must be in `us-east-1` for CloudFront):
   ```bash
   aws acm request-certificate \
     --domain-name "your-domain.com" \
     --validation-method DNS \
     --region us-east-1
   ```

2. **Validate Certificate**:
   - Get validation CNAME record from ACM
   - Add the CNAME record to your DNS provider
   - Wait for certificate status to become `ISSUED`

3. **Update template.yaml**:
   ```yaml
   CloudFrontDistribution:
     Properties:
       DistributionConfig:
         Aliases:
           - your-domain.com
         ViewerCertificate:
           AcmCertificateArn: arn:aws:acm:us-east-1:ACCOUNT:certificate/CERT-ID
           SslSupportMethod: sni-only
           MinimumProtocolVersion: TLSv1.2_2021
   ```

4. **Redeploy**:
   ```bash
   sam build && sam deploy
   ```

5. **Configure DNS**:
   - Create a CNAME record pointing your domain to the CloudFront distribution
   - Get CloudFront domain from AWS Console or CLI

### Environment-Specific Deployments

For multiple environments (dev, staging, prod):

```bash
# Deploy to staging
sam deploy --config-env staging

# Deploy to production  
sam deploy --config-env production
```

Update `samconfig.toml` with environment-specific configurations.

## 🧪 Local Development

### Run Locally

```bash
# Start local API
sam local start-api

# Test the endpoint
curl http://localhost:3000/no
```

### Test Function Directly

```bash
sam local invoke NoApi
```

## 📊 Monitoring and Logs

### View CloudWatch Logs

```bash
sam logs -n NoApi --stack-name no-as-a-service --tail
```

### Monitor Performance

- Check CloudWatch metrics for Lambda duration, errors, and invocations
- Monitor CloudFront cache hit ratio and origin requests
- Set up CloudWatch alarms for error rates and latency

## 💰 Cost Optimization

- **ARM64 Architecture**: ~20% cost reduction vs x64
- **Minimal Memory**: 128MB allocation for simple JSON responses
- **CloudFront Caching**: Reduces Lambda invocations
- **Serverless**: No idle costs, pay per request

## 🔒 Security Considerations

- HTTPS-only via CloudFront
- No authentication required (public API)
- Rate limiting via AWS API Gateway built-in limits
- CORS enabled for web browser access

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add new sarcastic responses to `reasons.json`
4. Test locally with `sam local start-api`
5. Submit a pull request

### Adding New Responses

Edit `reasons.json` to add new sarcastic "no" responses. Categories include:
- Developer frustrations
- Operations/DevOps pain points  
- Cybersecurity concerns
- General tech industry humor

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙋‍♂️ Support

- Create an issue for bugs or feature requests
- Check AWS CloudWatch logs for troubleshooting
- Verify AWS permissions for deployment issues

---

*Remember: Sometimes the best response is a creative "no". This API provides 450+ ways to say it with style and humor.*