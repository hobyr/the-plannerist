import type { Core } from '@strapi/strapi';
const getPreviewPathname = (uid, { document }): string => {
  const { slug } = document;

  switch (uid) {
    case "api::blog.blog": {
      if (!slug) {
        return "/blog";
      }
      return `/blog/${slug}`;
    }
    default: {
      return null;
    }
  }
};

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Admin => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY'),
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
});

export default config;
