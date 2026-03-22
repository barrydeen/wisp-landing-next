export interface Testimonial {
  nevent: string;
  eventId: string;
  pubkey: string;
  content: string;
  createdAt: number;
  author: {
    name: string;
    displayName: string;
    picture: string;
    nip05?: string;
  };
}

export const testimonials: Testimonial[] = [
  {
    nevent:
      "nevent1qqsqqqxlud5hxe65kqvlea96pkt7znfkhnlqy9yqm2sw5qhztq4yregzyq40mkw94crwztn5dfqa6mxv79p673lykev8g0t2yvl03q2trn27qmth456",
    eventId:
      "0000dfe369736754b019fcf4ba0d97e14d36bcfe021480daa0ea02e2582a41e5",
    pubkey:
      "2afdd9c5ae06e12e746a41dd6cccf143af47e4b658743d6a233ef8814b1cd5e0",
    content:
      "I feel like since #Wisp has entered the game #Amethyst and #Primal are upping their game\n\nNet positive for #Nostr users",
    createdAt: 1774098632,
    author: {
      name: "zap",
      displayName: "zap",
      picture:
        "https://image.nostr.build/8827e69400ddec21480e068b6eac3be864f242bda19a31f331f5d7aad934f7b8.jpg",
    },
  },
  {
    nevent:
      "nevent1qqsqqqzkuhw8hseehaugluke0lwr537pjhzdp077jku0n446tgj747szyzcses4llupn4rjdl25gpw45ug77w998cg82xg26p3j8slsqncqhuxek2v8",
    eventId:
      "000056e5dc7bc339bf788ff2d97fdc3a47c195c4d0bfde95b8f9d6ba5a25eafa",
    pubkey:
      "b10cc2bfff033a8e4dfaa880bab4e23de714a7c20ea3215a0c64787e009e017e",
    content:
      "#Wisp might be my favorite nostr client so far, honestly amazing job",
    createdAt: 1774093929,
    author: {
      name: "Dams",
      displayName: "Dams",
      picture:
        "https://image.nostr.build/3d8cf87aae4b0ebbba715951243c40fa806c4f47007d2f6669870f2a6ccf0a8d.jpg",
      nip05: "dams@verified-nostr.com",
    },
  },
  {
    nevent:
      "nevent1qqsqqqxscnw7yhf2scg9r0rzntexzn4d9u8mwjjp4040c09qncwy59spzpmhxue69uhkummnw3ezuamfdejsz8rhwden5te0dehhxarj9e3xjarrda5kuetj9eek7cmfv9kqz9nhwden5te0wfjkccte9ec8y6tdv9kzumn9wspzqvt9hqp89wdmckwk99jpyfa8ejyh7mpk0f06zu5c984t5j5l28fhxeh8ka",
    eventId:
      "0000d0c4dde25d2a861051bc629af2614ead2f0fb74a41abeafc3ca09e1c4a16",
    pubkey:
      "3165b80272b9bbc59d629641227a7cc897f6c367a5fa1729829eaba4a9f51d37",
    content:
      "Yea, nostalgia hit me hard as well when I heard it for the first time :D Btw, this client kicks ass. Everyone should try it out #wisp",
    createdAt: 1774092065,
    author: {
      name: "\u0394",
      displayName: "\u0394",
      picture: "https://m.primal.net/QhAp.jpg",
      nip05: "subjectdelta@nostrplebs.com",
    },
  },
  {
    nevent:
      "nevent1qqsqqqxyfewh5ncwf7e38y7cv7wqe2czwf7r6343cduhqvt0mujs5zqzyqcktwqzw2umh3vav2tyzgn60nyf0akrv7jl59efs202hf9f75wnw3wef6a",
    eventId:
      "0000c44e5d7a4f0e4fb31393d8679c0cab02727c3d46b1c37970316fdf250a08",
    pubkey:
      "3165b80272b9bbc59d629641227a7cc897f6c367a5fa1729829eaba4a9f51d37",
    content: "Holy shit, #wisp is surprisingly good.",
    createdAt: 1774079488,
    author: {
      name: "\u0394",
      displayName: "\u0394",
      picture: "https://m.primal.net/QhAp.jpg",
      nip05: "subjectdelta@nostrplebs.com",
    },
  },
  {
    nevent:
      "nevent1qqsqqqqvyc4tyrvvlfnf5c9xzuxdveg87vny2as64k8qqx77zcq5dlczyr6dk5nshkv3k9a758ndqd05thhrj2gec228fwavzq6z6g3uwnsdq230v6a",
    eventId:
      "00000c262ab20d8cfa669a60a6170cd66507f32645761aad8e001bde160146ff",
    pubkey:
      "f4db5270bd991b17bea1e6d035f45dee392919c29474bbac10342d223c74e0d0",
    content:
      "I've been a proud #Wisp user since version 0.1.0-alpha, and I say this as if months have passed, when in fact only three weeks have gone by.\n\nWisp is the fastest-evolving and most efficient Nostr client I've seen so far, and honestly, in an ecosystem like Nostr, where many projects start out as experiments and remain in their infancy for a long time, seeing a client evolve so rapidly is almost disorienting\u2026 but also promising.\n\nI hope Barry gets all the support he deserves.",
    createdAt: 1774033587,
    author: {
      name: "isolabellart",
      displayName: "isolabellart",
      picture:
        "https://creatr.nostr.wine/creator/content/c9149a12-1852-4607-91c0-eedbfce6949b.png",
      nip05: "isolabellart@isolabellart.it.com",
    },
  },
  {
    nevent:
      "nevent1qqsqqqx7suewspc0v2shjcnz88nh64x2vv63kcyw8s66xccl0jc87dgzyzyx00ke86yuj0gd3tyckfzrc4250x0dhyvsx355dvfwq0cnvez9q8cfjh5",
    eventId:
      "0000de8732e8070f62a179626239e77d54ca63351b608e3c35a3631f7cb07f35",
    pubkey:
      "8867bed93e89c93d0d8ac98b2443c5554799edb9190346946b12e03f13664450",
    content:
      "This new notification visualization is much more neat and fast to read.. super nice!\n\n#wisp",
    createdAt: 1773952698,
    author: {
      name: "IntuitiveGuy",
      displayName: "IntuitiveGuy",
      picture: "https://i.nostr.build/nb9628.gif",
      nip05: "intuitiveguy@nostrplebs.com",
    },
  },
  {
    nevent:
      "nevent1qqsqqqqzt3jkp70zwptaf5a8cm8uax853r2lhpxledkd5fs2ya43gzczyrkmgup8z2t6cknp7fml8ng5me2vvl44enfqauxemu5muxrgtwcqgjc5f7j",
    eventId:
      "0000025c6560f9e27057d4d3a7c6cfce98f488d5fb84dfcb6cda260a276b140b",
    pubkey:
      "edb470271297ac5a61f277f3cd14de54c67eb5ccd20ef0d9df29be18685bb004",
    content: "A #wisp is way better than a tweet",
    createdAt: 1773805265,
    author: {
      name: ".",
      displayName: ".",
      picture:
        "https://image.nostr.build/338193e0b573539b3658205e7aa6810879857b431afff864ff3229421835c867.jpg",
    },
  },
  {
    nevent:
      "nevent1qqsqqqplcpl64tntnqmxgrl6tfzaxvqscmtqy7kdrkk9ay0a9k9wdjczyqz7geycxt0m35dl4q020jl3eyky78x4q54ler25vka8gj4xlf0tsvg6uk3",
    eventId:
      "00003fc07faaae6b9836640ffa5a45d33010c6d6027acd1dac5e91fd2d8ae6cb",
    pubkey:
      "05e4649832dfb8d1bfa81ea7cbf1c92c4f1cd5052bfc8d5465ba744aa6fa5eb8",
    content: "wow #wisp is really good to load very old notes!",
    createdAt: 1773747294,
    author: {
      name: "archjourney",
      displayName: "archjourney",
      picture:
        "https://npub1qhjxfxpjm7udr0agr6nuhuwf9383e4g9907g64r9hf6y4fh6t6uqpcp36k.blossom.band/85e154634fa196ae9067f3186ce822d7f7e078e1e7bd1cfd6f11a314d28bf20f.png",
      nip05: "archjourney@nostr.land",
    },
  },
];
