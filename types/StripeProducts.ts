import { CoachEnum } from "@/types/Coaches";

const _useLiveProdId = false;
const _packageNamePrefix = _useLiveProdId ? "" : "[TEST] ";

/* TOBY - updated */
export const TOBY_4_SESSION = _useLiveProdId
  ? "n/a"
  : "prod_Uou0wup6f6vpU9";
export const TOBY_12_SESSION_LITE = _useLiveProdId
  ? "n/a"
  : "prod_UotzyovyDYXYUr";
export const TOBY_12_SESSION = _useLiveProdId
  ? "n/a"
  : "prod_Uou0Pny2YM2w4y";
export const TOBY_SINGLE_60M_SESSION = "prod_UotwL0RieuhMaL";
export const TOBY_SINGLE_30M_SESSION = "prod_UotvBefhic4ScX";

export const TOBY_4_SESSION_PAYMENT_LINK = _useLiveProdId
  ? "https://buy.stripe.com/6oE3eL80G74C4bS147"
  : "https://buy.stripe.com/test_14k7vI4ymfhSgiQeUW";
export const TOBY_12_SESSION_PAYMENT_LINK = _useLiveProdId
  ? "https://buy.stripe.com/cN2cPl6WC88GdMs6os"
  : "https://buy.stripe.com/test_14k5nAc0O9Xy0jS004";
export const TOBY_12_SESSION_LITE_PAYMENT_LINK = _useLiveProdId
  ? "https://buy.stripe.com/6oE02z80GgFcaAgcMR"
  : "https://buy.stripe.com/test_4gwg2e7Ky9Xy3w4eUX";

/* TOM */
export const TOM_4_SESSION = _useLiveProdId
  ? "prod_Qw1PrNK162Y8nB"
  : "prod_ROCazvbfkKnfkE";
export const TOM_12_SESSION_LITE = _useLiveProdId
  ? "prod_Qw1NG6QD1zvarF"
  : "prod_ROCaei51Gaw5Wh";
export const TOM_12_SESSION = _useLiveProdId
  ? "prod_Qw1OnqrqnpPIq6"
  : "prod_ROCZFUlzNdpBm1";

export const TOM_4_SESSION_PAYMENT_LINK = _useLiveProdId
  ? "https://buy.stripe.com/fZecPla8OcoWgYE8wD"
  : "https://buy.stripe.com/test_14keYa7Ky5Hic2AdQY";
export const TOM_12_SESSION_PAYMENT_LINK = _useLiveProdId
  ? "https://buy.stripe.com/9AQ4iP1Ci2OmbEk5ks"
  : "https://buy.stripe.com/test_fZeaHUc0O8Tu3w46oy";
export const TOM_12_SESSION_LITE_PAYMENT_LINK = _useLiveProdId
  ? "https://buy.stripe.com/dR66qXep42OmeQw28e"
  : "https://buy.stripe.com/test_5kAcQ27Kyd9K4A86ox";
export const TOM_SINGLE_60M_SESSION = "prod_Su4lRTHbmVw7uh";
export const TOM_SINGLE_30M_SESSION = "prod_Su4ktW02N1k5N8";

/* DAVID */
export const DAVID_4_SESSION = _useLiveProdId
  ? "prod_ROAVjUSJxkCeCB"
  : "prod_ROCblszYGSn6Y6";
export const DAVID_12_SESSION_LITE = _useLiveProdId
  ? "prod_ROAWk7eStQzcO8"
  : "prod_ROCaDu8vccE5DA";
export const DAVID_12_SESSION = _useLiveProdId
  ? "prod_ROAV9H8IvSOi5s"
  : "prod_ROCapYKyHdBgye";
export const DAVID_SINGLE_60M_SESSION = "prod_Su3MYcWCUZ8wFH";
export const DAVID_SINGLE_30M_SESSION = "prod_Su3MUUIrpuGAIz";

export const DAVID_4_SESSION_PAYMENT_LINK = _useLiveProdId
  ? "https://buy.stripe.com/7sI7v1cgWex49wc4gq"
  : "https://buy.stripe.com/test_7sI03gfd09Xyd6E8wB";
export const DAVID_12_SESSION_PAYMENT_LINK = _useLiveProdId
  ? "https://buy.stripe.com/6oE6qX6WCagOcIo28h"
  : "https://buy.stripe.com/test_00gg2eaWK7Pq1nWcMT";
export const DAVID_12_SESSION_LITE_PAYMENT_LINK = _useLiveProdId
  ? "https://buy.stripe.com/00gaHd6WCfB84bS9AL"
  : "https://buy.stripe.com/test_5kA6rEe8Wb1CeaI28e";

export const SHOULD_GENERATE_4_LINKS = new Set([
  TOBY_4_SESSION,
  TOM_4_SESSION,
  DAVID_4_SESSION,
]);

export const SHOULD_GENERATE_12_LINKS = new Set([
  TOBY_12_SESSION_LITE,
  TOBY_12_SESSION,
  TOM_12_SESSION_LITE,
  TOM_12_SESSION,
  DAVID_12_SESSION_LITE,
  DAVID_12_SESSION,
]);

export const TOM_PACKAGE_EMAIL_MAP: Record<
  string,
  { packageName: string; emailTemplateId: 2 | 4; coachName: CoachEnum }
> = {
  [TOM_4_SESSION]: {
    packageName: `${_packageNamePrefix}4-Session (60 mins)`,
    emailTemplateId: 2,
    coachName: CoachEnum.Tom,
  },
  [TOM_12_SESSION]: {
    packageName: `${_packageNamePrefix}12-Session (60 mins)`,
    emailTemplateId: 4,
    coachName: CoachEnum.Tom,
  },
  [TOM_12_SESSION_LITE]: {
    packageName: `${_packageNamePrefix}12-Session Lite (30 mins)`,
    emailTemplateId: 4,
    coachName: CoachEnum.Tom,
  },
};

export const DAVID_PACKAGE_EMAIL_MAP: Record<
  string,
  { packageName: string; emailTemplateId: 2 | 4; coachName: CoachEnum }
> = {
  [DAVID_4_SESSION]: {
    packageName: `${_packageNamePrefix}4-Session (60 mins)`,
    emailTemplateId: 2,
    coachName: CoachEnum.David,
  },
  [DAVID_12_SESSION]: {
    packageName: `${_packageNamePrefix}12-Session (60 mins)`,
    emailTemplateId: 4,
    coachName: CoachEnum.David,
  },
  [DAVID_12_SESSION_LITE]: {
    packageName: `${_packageNamePrefix}12-Session Lite (30 mins)`,
    emailTemplateId: 4,
    coachName: CoachEnum.David,
  },
};

export const TOBY_PACKAGE_EMAIL_MAP: Record<
  string,
  { packageName: string; emailTemplateId: 2 | 4; coachName: CoachEnum }
> = {
  [TOBY_4_SESSION]: {
    packageName: `${_packageNamePrefix}4-Session (60 mins)`,
    emailTemplateId: 2,
    coachName: CoachEnum.Toby,
  },
  [TOBY_12_SESSION]: {
    packageName: `${_packageNamePrefix}12-Session (60 mins)`,
    emailTemplateId: 4,
    coachName: CoachEnum.Toby,
  },
  [TOBY_12_SESSION_LITE]: {
    packageName: `${_packageNamePrefix}12-Session Lite (30 mins)`,
    emailTemplateId: 4,
    coachName: CoachEnum.Toby,
  },
};

export const STRIPE_SUBSCRIPTION_PRODUCT_IDS = [
  TOBY_4_SESSION,
  TOBY_12_SESSION_LITE,
  TOBY_12_SESSION,
  TOM_4_SESSION,
  TOM_12_SESSION_LITE,
  TOM_12_SESSION,
  DAVID_4_SESSION,
  DAVID_12_SESSION_LITE,
  DAVID_12_SESSION,
];
