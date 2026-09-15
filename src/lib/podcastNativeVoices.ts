/**
 * Native regional voice map.
 *
 * Each narrator accent id from ACCENT_BANK (src/lib/podcastVoices.ts) is paired
 * with a real ElevenLabs voice recorded by a speaker of that region, so the
 * accent comes from the voice itself rather than from prompt steering alone.
 *
 * Keep this table identical to NATIVE_VOICE_IDS in
 * supabase/functions/generate-podcast/index.ts.
 */
export const NATIVE_VOICE_IDS: Record<string, string> = {
  // ---- General UK ----
  "british-rp": "onwK4e9ZLuTAKqWW03F9",
  "british-female-warm": "Xb7hH8MSUJpSbSDYk0k2",
  "british-male-deep": "JBFqnCBsd6RMkjVDRZzb",
  "british-storyteller": "rduzwhyZDdtuFPq1Z1mL",
  "british-estuary": "WAppqUXeqDqXjNTaQxG9",

  // ---- Southern England ----
  "british-cockney": "ZPscCHzkUPfwf2Lb8iTN",
  "british-essex": "kOVqQImaJYcrUxZmjqgl",
  "british-kent": "kOVqQImaJYcrUxZmjqgl",
  "british-sussex": "VDYfIKeHJwXUpUQhs8FR",
  "british-hampshire": "0gVktkr00JMS8R3IQduC",
  "british-portsmouth": "2PdI8DPVJN5Yv2PS8GnZ",
  "british-home-counties": "0gVktkr00JMS8R3IQduC",
  "british-thames-valley": "VDYfIKeHJwXUpUQhs8FR",
  "british-oxford": "onwK4e9ZLuTAKqWW03F9",
  "british-east-anglian": "Z7rMwyCsIFBOJYGA90x5",

  // ---- West Country ----
  "british-west-country": "eURLKBzvb5E5aqqZzVll",
  "british-bristol": "eURLKBzvb5E5aqqZzVll",
  "british-cornish": "eURLKBzvb5E5aqqZzVll",
  "british-devon": "eURLKBzvb5E5aqqZzVll",
  "british-dorset": "eURLKBzvb5E5aqqZzVll",
  "british-wiltshire": "eURLKBzvb5E5aqqZzVll",
  "british-gloucestershire": "eURLKBzvb5E5aqqZzVll",

  // ---- Midlands ----
  "british-brummie": "6Hk5N8GuiCHuiVaN9oEZ",
  "british-black-country": "6Hk5N8GuiCHuiVaN9oEZ",
  "british-coventry": "6Hk5N8GuiCHuiVaN9oEZ",
  "british-warwickshire": "6Hk5N8GuiCHuiVaN9oEZ",
  "british-worcester": "6Hk5N8GuiCHuiVaN9oEZ",
  "british-herefordshire": "6Hk5N8GuiCHuiVaN9oEZ",
  "british-shropshire": "6Hk5N8GuiCHuiVaN9oEZ",
  "british-northampton": "KcLqsbwovWNu6csJC59a",
  "british-east-midlands": "KcLqsbwovWNu6csJC59a",
  "british-nottingham": "pYDLV125o4CgqP8i49Lg",
  "british-derby": "KcLqsbwovWNu6csJC59a",
  "british-leicester": "DcADU5DwsQtYalQf4OwN",
  "british-lincolnshire": "KcLqsbwovWNu6csJC59a",
  "british-potteries": "KcLqsbwovWNu6csJC59a",

  // ---- Northern England ----
  "british-yorkshire": "8KgifH3usc0tJtr7QzP4",
  "british-york": "8KgifH3usc0tJtr7QzP4",
  "british-leeds": "QMc6FU2Fkzs9Dkeq7swc",
  "british-hull": "QMc6FU2Fkzs9Dkeq7swc",
  "british-sheffield": "7aMcdLeWslXSj6o3RLB6",
  "british-barnsley": "oCXdm5WkYoKVEdlbPLev",
  "british-bradford": "3HCsOhirtjbPmdcSOPBt",
  "british-lancashire": "sAxd8ffzrizgUQNI8nre",
  "british-preston": "06XuAUP0A9YB4BMpW3Zh",
  "british-bolton": "CykdO0j5SUxVoZ4PxHhQ",
  "british-blackburn": "9LQRvqwzjElMJrr5cC7j",
  "british-wigan": "AmY1pcgcEc15wyuIj50p",
  "british-oldham": "Q7iNt6VsGSsBbtyUto9N",
  "british-manchester": "c8MZcZcr0JnMAwkwnTIu",
  "british-scouse": "m3ERpbBFjTAqD5PJozID",
  "british-geordie": "lfPTQbwnu1oXQ9g6V0r4",
  "british-northumberland": "b6T2IrWoTx7ZIb3BHJSg",
  "british-mackem": "TockUyWWZDWGrk7QuzTF",
  "british-durham": "0CoxwbC90B8N0Fa3LDCH",
  "british-teesside": "pVO3hb8CkRBDORpESeTP",
  "british-cumbrian": "AmY1pcgcEc15wyuIj50p",

  // ---- Wales ----
  "welsh-south": "sBU90Bu4NCleWDoNkGog",
  "welsh-swansea": "sBU90Bu4NCleWDoNkGog",
  "welsh-cardiff": "wUkGqD7qevNIshEdEC5s",
  "welsh-north": "DikmR0aoFXAp1A3NcovW",
  "welsh-wrexham": "DikmR0aoFXAp1A3NcovW",
  "welsh-valleys": "73fZMjboCm1aBVyxTbBp",
  "welsh-pembrokeshire": "73fZMjboCm1aBVyxTbBp",
  "welsh-mid": "698IrvLv5nahuUHY2tLv",
  "welsh-anglesey": "698IrvLv5nahuUHY2tLv",

  // ---- Scotland ----
  scottish: "MAy1fRIg5hTqbhiwOUyh",
  "scottish-glaswegian": "eVKQybPTL0poBPxBa8L6",
  "scottish-lanarkshire": "v2zbX16tJNtRIx8rSHDM",
  "scottish-highland": "NfUrCNRReUL9RXS9upG1",
  "scottish-doric": "JdanfwfOBtHuVRJhsamV",
  "scottish-perthshire": "JdanfwfOBtHuVRJhsamV",
  "scottish-dundee": "K6kfGjxPNlaoz8EBsza3",
  "scottish-fife": "s07KcA1KjfdDAsyJ87HW",
  "scottish-ayrshire": "YIn3yKpQSeXNJMF5CIuj",
  "scottish-borders": "7UE6ud8dYBLLAIS6hsjQ",
  "scottish-hebridean": "TVmbglAk3F1GkiCoOq47",
  "scottish-orkney": "eh9GHWIaYsZB3Alk8wrY",
  "scottish-shetland": "iePvrB4HtMcAormXZou7",

  // ---- Ireland ----
  irish: "N5OEakgvy8bwbFcXZzJ8",
  "irish-dublin": "KEVRa7mtDwmBo6pi4ItL",
  "irish-cork": "hmMWXCj9K7N5mCPcRkfC",
  "irish-galway": "4AgX6Piqqh5KT4pSisZQ",
  "irish-kerry": "qMwfU3hSVd8X55O2BAxf",
  "irish-limerick": "thYWTC3ObLUgoeN0sEv3",
  "irish-waterford": "4W8xz6cmN5JMnmmVA3is",
  "irish-donegal": "C92s6vssSLlabgIln1iY",
  "irish-northern": "7uDxvtPDB7zMehaRUyXh",
  "irish-derry": "Jot7IsvC9VkWPLPjLDKw",

  // ---- Crown dependencies ----
  "british-isle-of-man": "0gVktkr00JMS8R3IQduC",
  "jersey-english": "0gVktkr00JMS8R3IQduC",
  "guernsey-english": "VDYfIKeHJwXUpUQhs8FR",

  // ---- Wider English ----
  australian: "RGxA2l7cGpflpAvl00TI",
  "new-zealand": "3Mb3pRhm3AnXiPCSQNXS",
  "south-african": "xvDjI8KMgjF1nCoPoNKX",
  canadian: "bE3COCGjWQ0g9MBhv2cf",
  "indian-english": "NPYfT6ZXJNvSIP4tierK",
  american: "xzCR0y39xuy9hiysqyV3",
};

/** True when the accent is voiced by a real regional speaker. */
export const hasNativeVoice = (id: string | undefined): boolean =>
  !!id && !!NATIVE_VOICE_IDS[id];
