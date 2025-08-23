# Termii Node SDK

[![npm version](https://img.shields.io/npm/v/@davidbolaji/termii-node.svg)](https://www.npmjs.com/package/@davidbolaji/termii-node) [![build status](https://img.shields.io/github/actions/workflow/status/DavidBolaji/termii-node/ci.yml)](https://github.com/DavidBolaji/termii-node/actions)

TypeScript SDK for Termii API. Provides convenient methods to send SMS, bulk messages, WhatsApp templates, manage campaigns, handle Sender IDs, OTP tokens, and eSIM services.

## Installation

```bash
npm install @davidbolaji/termii-node
```

## Quick Start

### Using the Termii Client Class

```ts
import { Termii } from '@davidbolaji/termii-node';

const client = new Termii('YOUR_API_KEY');

// Send a message
const response = await client.message.sendMessage({
  to: '+2348012345678',
  from: 'SENDERID',
  sms: 'Hello from Termii SDK',
  type: 'plain',
  channel: 'generic'
});
```

### Using Direct Functions

```ts
import { initialize, sendMessage } from '@davidbolaji/termii-node';

// Initialize once
initialize('YOUR_API_KEY');

// Send a single message
const response = await sendMessage({
  to: '+2348012345678',
  from: 'SENDERID',
  sms: 'Hello directly',
  type: 'plain',
  channel: 'generic'
});
```

---

## Features

- **Messaging**: Send SMS, WhatsApp, bulk, and template messages.
- **Campaigns**: Create, list, retry, and view campaign history.
- **Sender IDs**: Fetch and request new sender IDs.
- **OTP Tokens**: Send and verify OTP via SMS, WhatsApp, Voice, Email, and In-App.
- **Insights**: Balance, number lookup, history, porting, and webhook event verification.
- **eSIM Services (Sotel)**: Plans, provisioning, QR codes, usage tracking.

---

## Examples

### Messaging

```ts
const single = await client.message.sendMessage({
  to: '+2348012345678',
  from: 'SENDERID',
  sms: 'Hello world',
  type: 'plain',
  channel: 'generic'
});
```

### Bulk Messaging

```ts
const bulk = await client.message.sendBulkMessage({
  to: ['+2348012345678', '+2348098765432'],
  from: 'SENDERID',
  sms: 'Hello everyone',
  type: 'plain',
  channel: 'generic'
});
```

### Template Messaging

```ts
const template = await client.template.sendTemplate({
  phone_number: '2348012345678',
  device_id: 'DEVICE_ID',
  template_id: 'TEMPLATE_ID',
  data: { name: 'Alice', code: '9876' }
});
```

### Campaigns

```ts
const sent = await client.campaign.sendCampaign({
  country_code: '234',
  sender_id: 'SENDERID',
  message: 'Hello campaign',
  channel: 'generic',
  message_type: 'plain',
  phonebook_id: 'PHONEBOOKID',
  campaign_type: 'promo',
  schedule_sms_status: 'regular'
});
```

### Sender IDs

```ts
const senderIds = await client.sender.fetchSenderIds(1);
```

### OTP Tokens

```ts
const otp = await client.token.sendToken({
  to: '2348012345678',
  from: 'SENDERID',
  channel: 'whatsapp',
  pin_attempts: 3,
  pin_time_to_live: 5,
  pin_length: 6,
  message_text: 'Your verification code is < 123456 >',
  pin_type: 'NUMERIC'
});
```

### Insights

```ts
const balance = await client.insight.balance.getBalance();
```

### eSIM Services

```ts
const esimPlans = await client.sotel.esim.fetchPlans({
  country: 'Nigeria',
  type: 'LOCAL'
});
```

---

## Advanced Configuration

- **Custom Base URL**:  
  Pass `baseUrl` to the constructor:  
  ```ts
  const client = new Termii('YOUR_API_KEY', 'https://api.custom-url.com');
  ```

- **Auth Location**:  
  Control how API key is injected (`query`, `body`, `none`).
  ```ts
  const response = await (client as any).http.request('/sms/otp/send', {
    method: 'POST',
    data: payload,
    authLocation: 'body'
  });
  ```

- **Raw HTTP Responses**:  
  Retrieve status, headers, and data.
  ```ts
  const { status, headers, data } = await (client as any).http.request('/sms/history', {
    authLocation: 'none',
    raw: true
  });
  ```

- **Extend the SDK**:  
  Subclass `Termii` to add interceptors.
  ```ts
  class CustomTermii extends Termii {
    constructor(apiKey: string, baseUrl?: string) {
      super(apiKey, baseUrl);
      this['http'].client.interceptors.request.use(config => {
        // custom request logic
        return config;
      });
    }
  }
  ```
---

## Contributing

Contributions welcome! Please open issues or pull requests.

---

## License

MIT

---