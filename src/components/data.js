// The title + summary of claim at the top of each Claim page 
const summaries = [
    {
        claimMainTitle: 'Forty beheaded babies',
        claimSummary:
        'Israeli officials claimed up to 40 babies were decapitated in kibbutzes following Operation Al-Aqsa Flood on 7 October, 2023. Versions of this fabrication have been repeated by politicians and the media globally.',
    },
 
    {
        claimMainTitle: 'Al-Ahli Hospital was attacked by Palestinian rockets, not Israeli forces',
        claimSummary: 'Israeli officials claim Israeli forces do not bomb hospitals, and that the Al-Shifa Hospital attack was a misfired rocket from the Palestinian resistance.',
    },
 
    {
        claimMainTitle: 'Israeli state offered fuel to Al-Shifa Hospital and it was refused by Hamas',
        claimSummary: 'Israeli officials claimed Hamas refused supplies of fuel to the hospital. What actually happened: Israeli forces refused to give fuel through Red Cross as requested by Al-Shifa’s doctors.',
    },

    {
        claimMainTitle: 'Makeup used in Gaza to fake injuries',
        claimSummary: 'Israeli officials shared behind-the-scenes footage of a short film claiming it featured Palestinians in Gaza using makeup to fake injuries.',
    },

    {
        claimMainTitle: 'Hamas were carrying instructions on how to make chemical weapons',
        claimSummary: 'The ‘training manuals’ Israeli officials claimed to find on bodies of Hamas fighters do not contain instructions on how to make chemical weapons.',
    },

    {
        claimMainTitle: 'Israeli state denies killing mother and daughter seeking refuge in Gaza’s Holy Family Parish',
        claimSummary: 'In the days following the murder of Nahida and Samar Anton at Gaza’s Catholic church by an Israeli sniper, Israeli officials gave contradictory stories.',
    },

    {
        claimMainTitle: '',
        claimSummary: '',
    },

    {
        claimMainTitle: '',
        claimSummary: '',
    },

    {
        claimMainTitle: '',
        claimSummary: '',
    },
]


// All claims data, stored in the tracker
const data = [
// CLAIM: Forty beheaded babies
    {   
        claimTitle: 'Forty beheaded babies',
        // claimSummary: 'Israeli soldiers claimed they found up to 40 decapitated or murdered babies in kibbutzes across occupied Palestine. This has been repeated by politicians and the media abroad.',
        date: '1948',
        claim: {
            claimText: 'Context',
            claimTag: 'context-tag',
        },
        description: {
            summary: 'Exclusive Jewish kibbutzes exist on ethnically cleansed Palestinian towns and villages',
            details: 'The kibbutzes Kfar Aza and Be’eri are on ethnically cleansed Palestinian land, where many Palestinians currently living in post-Nakba Gaza were displaced from in 1948. The Kfar Aza kibbutz is on land that was originally part of Gaza before the Nakba, the ethnic cleansing of Palestine in 1948 or afterwards by Zionist militias to establish the Israeli state.<br /><br /><img src="/files/map_gaza_kibbutzes.png" alt="" width="100%" loading="lazy" /><br />The Palestinian villages and towns ethnically cleansed in 1948 to make way for the Jewish Israeli settlements include:<br /><br /><u>Gaza, pre-1948:</u><br /><br /><b>Al-Muharraqa</b><br />Ethnically cleansed by the Palmach’s Negev Brigade<br />27–28 May 1948<br/><br /><b>Huj</b><br />Ethnically cleansed by Yishuv forces<br />31 May 1948<br /><br /><b>Najd</b><br />Ethnically cleansed by Yishuv forces<br />12 May 1948<br /><br /><b>Simsim</b><br />Ethnically cleansed by Yishuv forces<br />12 May 1948<br /><br /><b>Dimra</b><br />Ethnically cleansed possibly by the Giva’ti Brigade in Operation Yo’av<br />28 October 1948<br /><br /><b>Dayr Sunayd</b><br />Ethnically cleansed by Yishuv forces<br />Late October or early November 1948<br /><br /><b>Wuhaidat Tarabin</b><br />Ethnically cleansed by the Golani Brigade during Operation Assaf<br />5 December 1952<br /><br /><br /><u>Bir-a-Saba (Bersheeba), pre-1948</u><br /><br /><b>Abu Muailiq/Hasanat</b><br />Ethnically cleansed<br />5 July 1948<br /><br /><b>Gatatweh</b><br />Ethnically cleansed, details unknown<br />1948<br /><br /><b>Atawneh/Ntoush</b><br />Ethnically cleansed, details unknown<br />1948<br /><br /><b>Franji</b><br />Ethnically cleansed, details unknown<br />1948',
        },
        sources: [
            {
                sourceName: '<em>The birth of the Palestinian refugee problem revisited</em> by Benny Morris, 2004',
                sourceLink: 'https://www.google.co.uk/books/edition/The_Birth_of_the_Palestinian_Refugee_Pro/uM_kFX6edX8C?hl=en&gbpv=1&pg=PR21&printsec=frontcover',
            },
            {
                sourceName: 'Palestine Remembered',
                sourceLink: 'https://www.palestineremembered.com/Gaza/index.html',
                archiveLink: 'https://archive.ph/xCyzu',
            },
            {
                sourceName: '<em>The Palestinian Nakba 1948</em>, by Salman Abu Sitta, 2000 ',
                sourceLink: 'https://www.plands.org/en/books-reports/books/the-palestinian-nakba-1948/pdf/the-register-of-depopulated-localities-in-palestine',
            },
        ]
    },    
 
 
    {
        claimTitle: 'Forty beheaded babies',
        date: '10 Oct 2023',
        claim: {
            claimText: 'Claim',
            claimTag: 'claim-tag',
    },
 
        description: {
            summary: 'Israeli state claims babies and toddlers found with ‘heads decapitated’ in the Kfar Aza kibbutz',
            details: 'A spokesperson for the Israeli state’s Prime Minister claimed babies and toddlers were found with their ‘heads decapitated’ in the Kfar Aza kibbutz after Hamas fighters entered Occupied Palestine (what constitutes part of the State of Israel today) on 7 October 2023.<br /><br />Nicole Zedeck, a reporter with Tel Aviv-based news channel i24, interviewed IOF soldier David Ben Zion, who made the same claim on 10 October 2023. He said, ‘They cut heads of children, they cut heads of women.’<br /><br />Ben Zion’s claims made the front page of The Metro newspaper in the UK.',
        },
 
        sources: [
            {
                sourceName: 'i24NEWS',
                sourceLink: 'https://twitter.com/i24NEWS_EN/status/1711718195025821976',
                archiveLink: 'https://files.hasbaratracker.com/i24_10Oct.mp4',
                videoPreviewLink: 'https://files.hasbaratracker.com/i24_10Oct.mp4'
            },
            {
                sourceName: '@Nicole_Zedek on X',
                sourceLink: 'https://twitter.com/Nicole_Zedek/status/1711721433968111855',
                archiveLink: 'https://archive.ph/AhYIH',
            },
        ]
    },
 
 
    {
        claimTitle: 'Forty beheaded babies',
        date: '10 Oct 2023',
        claim: {
            claimText: 'Claim',
            claimTag: 'claim-tag',
        },
        description: {
            summary: 'CNN reporter Nic Robertson claims babies’ heads cut off',
            details: 'Nic Robertson, a CNN reporter, claimed Palestinian resistance fighters carried out ‘ISIS-style executions’ by ‘cutting the heads off of people’, including babies and killing their pets.<br /><br />‘Men, women, children, hands bound, shot, executed, heads cut.’',
        },
 
        sources: [
            {
                sourceName: 'CNN',    
                sourceLink: 'https://twitter.com/NickFondacaro/status/1711812499014660462',
                archiveLink: 'https://files.hasbaratracker.com/IG_NicRobertson_10Oct.mp4',
                videoPreviewLink: 'https://files.hasbaratracker.com/IG_NicRobertson_10Oct.mp4',
            },
        ]
    },
 
 
    {
        claimTitle: 'Forty beheaded babies',
        date: '11 Oct 2023',
        claim: {
            claimText: 'Claim',
            claimTag: 'claim-tag',
        },
        description: {
            summary: 'Israeli Foreign Affairs Ministry runs ads about 40 murdered babies',
            details: 'The Israeli Foreign Affairs Ministry starts running ads targeting children’s content on YouTube. The 28-second video advertisement is titled ‘Babies Can’t Read The Text In This Video But Their Parents Can’ and shows an animated rainbow and unicorn. The text in the video reads:<br /><br />‘We know that your child cannot read this. We have an important message to tell you as parents. 40 infants were murdered in Israel by the Hamas terrorists (ISIS). Just as you would do everything for your child. We will do everything to protect ours. Now hug your baby and stand with us.’',
        },
 
        sources: [
            {
                sourceName: '@IsraelMFA on YouTube',    
                sourceLink: 'https://www.youtube.com/watch?v=Hh8t8sHnTng',
                archiveLink: 'https://files.hasbaratracker.com/IsraelMFA_11Oct.mp4',
                videoPreviewLink: 'https://files.hasbaratracker.com/IsraelMFA_11Oct.mp4',
            },
        ]
    },
 
 
    {
        claimTitle: 'Forty beheaded babies',
        date: '11 Oct 2023',
        claim: {
            claimText: 'Claim',
            claimTag: 'claim-tag',
    },
        description: {
            summary: 'Israeli first responder group Zaka representative claims he saw beheaded babies',
            details: 'In an interview with American news outlet CBS News, Yossi Landau, Head of Operations in the ‘southern region’ with Israeli first responder group Zaka said he saw ‘with his own eyes children and babies who had been beheaded’.',
        },
 
        sources: [
            {
                sourceName: 'CBS News',
                sourceLink: 'https://www.cbsnews.com/news/israel-babies-killed-hamas-terror-attack-kibbutz-kfar-aza-first-responders-say/',
                archiveLink: 'https://archive.ph/RFI9h',
            },
        ]
    },
 
 
    {
        claimTitle: 'Forty beheaded babies',
        date: '11 Oct 2023',
        claim: {
            claimText: 'Claim',
            claimTag: 'claim-tag',
    },
        description: {
            summary: 'US President Biden claims he saw ‘pictures’ of babies being beheaded',
            details: 'In an address to Jewish community leaders on 11 October 2023, US President Joe Biden said: ‘I never really thought that I would see and have confirmed pictures of terrorists beheading children.’',
        },
 
        sources: [
            {
                sourceName: 'Fox News',
                sourceLink: 'https://twitter.com/dpatrikarakos/status/1712219633594376581',
                archiveLink: 'https://files.hasbaratracker.com/Fox_Biden_10Oct.mp4',
                videoPreviewLink: 'https://files.hasbaratracker.com/Fox_Biden_10Oct.mp4',
            },
        ]
    },
 
 
    {
        claimTitle: 'Forty beheaded babies',
        date: '11 Oct 2023',
        claim: {
            claimText: 'Debunk',
            claimTag: 'debunk-tag',
        },
        description: {
            summary: 'White House official clarifies Biden did not see pictures of decapitated babies',
            details: 'A White House administration official later clarified President Biden’s remarks, saying that Biden was referring to public statements from officials and media reports and had not actually seen photos of beheaded babies.',
        },
        sources: [
            {
                sourceName: 'CNN',
                sourceLink: 'https://www.cnn.com/2023/10/12/politics/joe-biden-photos-children-hamas-israel/index.html',
                archiveLink: 'https://archive.ph/gaDln',
            },
        ]
    },
 
 
    {
        claimTitle: 'Forty beheaded babies',
        date: '11 Oct 2023',
        claim: {
            claimText: 'Claim',
            claimTag: 'claim-tag',
        },
        description: {
            summary: 'Sara Sidner, CNN reporter, repeated the Israeli state claim that babies were beheaded',
            details: 'In a CNN news report, Sidner claimed babies and toddlers were found with their ‘heads decapitated’ in Kfar Aza.',
        },
        sources: [
            {
                sourceName: 'CNN',
                sourceLink: 'https://www.mediaite.com/news/children-were-murdered-full-stop-cnn-anchor-reports-on-horrifying-photos-of-israeli-babies-killed-by-hamas/',
                archiveLink: 'https://files.hasbaratracker.com/CNNTV_11Oct.mp4',
                videoPreviewLink: 'https://files.hasbaratracker.com/CNNTV_11Oct.mp4',
            },
        ]
    },
 
 
    {
        claimTitle: 'Forty beheaded babies',
        date: '11 Oct 2023',
        claim: {
            claimText: 'Debunk',
            claimTag: 'debunk-tag',
        },
        description: {
            summary: 'IOF won’t back up decapitated babies claim because it is ‘disrespectful for the dead’',
            details: 'Israeli soldier Major Nir Dinar said the IOF refused to share the exact number of babies killed or how many had been beheaded as it is ‘disrespectful for the dead’.',
        },
        sources: [
            {
                sourceName: 'Business Insider',
                sourceLink: 'https://www.businessinsider.com/idf-says-wont-back-up-beheaded-babies-disrespectful-2023-10',
                archiveLink: 'https://archive.ph/Otjey',
            },
        ]
    },    
 
 
    {
        claimTitle: 'Forty beheaded babies',
        date: '11 Oct 2023',
        claim: {
            claimText: 'Claim',
            claimTag: 'claim-tag',
        },
        description: {
            summary: 'Netanyahu spokesperson ‘confirms’ decapitated babies',
            details: 'In an interview with UK broadcaster LBC, Tal Heinrich – spokesperson for the Israeli Prime Minister’s Office – ‘confirmed’ soldiers on the ground had been dealing with babies who had been decapitated.',
        },
        sources: [
            {
                sourceName: 'LBC',
                sourceLink: 'https://www.lbc.co.uk/news/kfar-azza-hamas-attack-babies-children/',
                archiveLink: 'https://files.hasbaratracker.com/LBC_11Oct.mp4',
                videoPreviewLink: 'https://files.hasbaratracker.com/LBC_11Oct.mp4',
            },
        ]
    },    
 
    {
        claimTitle: 'Forty beheaded babies',
        date: '11 Oct 2023',
        claim: {
            claimText: 'Context',
            claimTag: 'context-tag',
        },
        description: {
            summary: 'Israeli army reservist David Ben Zion is a settler council leader who has incited riots against Palestinians, sits on board of Jewish National Fund',
            details: 'The Israeli reserve soldier David Ben Zion who told a reporter Palestinian militants ‘cut [off] heads of babies’ is the deputy head of the Samaria Regional Council (also called Shomron Regional Council) that represents illegal settlements in the northern West Bank. Ben Zion represents 35 illegal settlements in the Israeli-occupied West Bank. He also sits on the board of the National Fund for Israel.<br /><br />He has previously called for the Palestinian village of Huwarra to be ‘erased’ and incited settler riots in Huwara and other Palestinian villages on 26 February, 2023. He posted on X (formerly Twitter) at the time: ‘The village of Huwara must be erased, this place is a terror nest, and the punishment has to be on everyone.’<br /><br />David Ben Zion also sits on the board of the KKL-JNF – the Jewish National Fund – a quasi-governmental agency used to expropriate Palestinian land.',
        },
        sources: [
            {
                sourceName: 'Middle East Eye',
                sourceLink: 'https://www.middleeasteye.net/news/israel-palestine-huwwara-deadly-settler-riot-politicians-laud',
                archiveLink: 'https://archive.ph/3Rybl',
            },
            {
                sourceName: 'KKL-JNF Board of Directors',
                sourceLink: 'https://www.kkl-jnf.org/about-kkl-jnf/kkl-jnf-id/our-leadership/kkl-jnf-board-of-directors/',
                archiveLink: 'https://archive.is/twsrq',
            },
        ]
    },    
 
    {
        claimTitle: 'Forty beheaded babies',
        date: '12 Oct 2023',
        claim: {
            claimText: 'Debunk',
            claimTag: 'debunk-tag',
        },
        description: {
            summary: 'Sara Sidner of CNN retracts and apologises for sharing the claim',
            details: 'In a post on X (formerly Twitter), CNN reporter Sara Sidner apologies for sharing disinformation:<br /><br />‘Yesterday the Israeli Prime Minister’s office said that it had confirmed Hamas beheaded babies and children while we were live on the air. The Israeli government now says today it CANNOT confirm babies were beheaded. I needed to be more careful with my words and I am sorry.’',
        },
        sources: [
            {
                sourceName: '@sarasidnerCNN on X',
                sourceLink: 'https://twitter.com/sarasidnerCNN/status/1712415116363169884',
                archiveLink: 'https://archive.is/rom8W',
            },
        ]
    },    
 
    {
        claimTitle: 'Forty beheaded babies',
        date: '12 Oct 2023',
        claim: {
            claimText: 'Debunk',
            claimTag: 'debunk-tag',
        },
        description: {
            summary: 'CNN retracts reporting that Palestinian resistance fighters decapitated babies',
            details: 'CNN publishes an article stating that ‘Israeli official says government cannot confirm babies were beheaded in Hamas attack’.',
        },
        sources: [
            {
                sourceName: 'CNN',
                sourceLink: 'https://www.cnn.com/2023/10/12/middleeast/israel-hamas-beheading-claims-intl/index.html',
                archiveLink: 'https://archive.ph/icFaG',
            },
        ]
    },    
 
    {
        claimTitle: 'Forty beheaded babies',
        date: '12 Oct 2023',
        claim: {
            claimText: 'Claim',
            claimTag: 'claim-tag',
        },
        description: {
            summary: 'IOF spokesperson says ‘relatively confident’ that babies were beheaded',
            details: 'In a video shared by the official IOF account on X (formerly Twitter), spokesperson Jonathan Conricus claimed Palestinian resistance fighters had ‘likely’ carried out decapitations of babies in the Be’eri kibbutz.<br /><br />‘We got very very disturbing reports that came from the ground that there were babies that had been beheaded… I think we can now say with relative confidence that unfortunately this is what happened in Be’eri.’',
        },
        sources: [
            {
                sourceName: '@IDF on X',
                sourceLink: 'https://twitter.com/IDF/status/1712282365924343910',
                archiveLink: 'https://files.hasbaratracker.com/20231012_JonathanConricusBriefing.mp4',
                videoPreviewLink: 'https://files.hasbaratracker.com/20231012_JonathanConricusBriefing_preview.mp4',
            },
        ]
    },    
 
 
    {
        claimTitle: 'Forty beheaded babies',
        date: '12 Oct 2023',
        claim: {
            claimText: 'Claim',
            claimTag: 'claim-tag',
        },
        description: {
            summary: 'The Jerusalem Post claims beheaded babies claims are ‘correct’',
            details: 'The Jerusalem Post, an Israeli newspaper, wrote on X (formerly Twitter) on 12 October, 2023, that it can ‘confirm based on verified photos of the bodies that the reports of babies being burnt and decapitated in Hamas’s assault on Kfar Aza are correct. May their memory be a blessing.’',
        },
        sources: [
            {
                sourceName: '@Jerusalem_Post on X',
                sourceLink: 'https://twitter.com/Jerusalem_Post/status/1712460425529372821',
                archiveLink: 'https://archive.ph/9c9L0',
            },
        ]
    },    
 
 
    {
        claimTitle: 'Forty beheaded babies',
        date: '12 Oct 2023',
        claim: {
            claimText: 'Debunk',
            claimTag: 'debunk-tag',
        },
        description: {
            summary: 'The IOF refuses to confirm the claim of murdered babies',
            details: 'IOF spokesperson Maj. Doron Spielman told NBC News: ‘That specific report and that number I can’t confirm.’',
        },
        sources: [
            {
                sourceName: 'NBC News',
                sourceLink: 'https://www.nbcnews.com/politics/white-house/biden-deliver-remarks-roundtable-jewish-community-leaders-rcna119865',
                archiveLink: 'https://archive.ph/MxZTk',
            },
        ]
    },
 
 
    {
        claimTitle: 'Forty beheaded babies',
        date: '13 Oct 2023',
        claim: { 
            claimText: 'Debunk',
            claimTag: 'debunk-tag',
        },
        description: {
            summary: 'Israeli military: ‘We cannot confirm but you can assume it happened.’',
            details: 'Al Jazeera reports that when journalists asked a spokesman for the Israeli military about the story of beheaded babies, the reply was, ‘We cannot confirm but you can assume it happened.’',
        },
        sources: [
            {
                sourceName: 'Al Jazeera',
                sourceLink: 'https://www.aljazeera.com/opinions/2023/10/13/watching-the-watchdogs-babies-and-truth-die-together-in-israel-palestine',
                archiveLink: 'https://archive.ph/RNLTs',
            },
        ]
    },    
 
 
    {
        claimTitle: 'Forty beheaded babies',
        date: '17 Oct 2023',
        claim: { 
            claimText: 'Claim',
            claimTag: 'claim-tag',
        },
        description: {
            summary: 'Zaka first responder Yossi Landau in an interview repeats claims of beheaded babies',
            details: 'In an interview with American news outlet 6abc Philadelphia Yossi Landau, head of operations in the ‘southern region’ with first responder group Zaka, repeats the claim that he saw beheaded babies among other assertions.',
        },
        sources: [
            {
                sourceName: '6abc Philadelphia',
                sourceLink: 'https://www.youtube.com/watch?v=4Nn8Y_ulBMI',
                archiveLink: 'https://files.hasbaratracker.com/6abc_YossiLandau_17Oct.mp4',
                videoPreviewLink: 'https://files.hasbaratracker.com/6abc_YossiLandau_17Oct.mp4',
            },
        ]
    },    
 
 
    {
        claimTitle: 'Forty beheaded babies',
        date: '18 Oct 2023',
        claim: { 
            claimText: 'Claim',
            claimTag: 'claim-tag',
        },
        description: {
            summary: 'US President Joe Biden repeats claim in a visit to Tel Aviv in the Israeli state (historic occupied Palestine)',
            details: 'In his speech, US President Biden states: ‘Children slaughtered. Babies slaughtered. Entire families massacred. Rape, beheadings, bodies burned alive.’',
        },
        sources: [
            {
                sourceName: 'The White House',
                sourceLink: 'https://www.whitehouse.gov/briefing-room/speeches-remarks/2023/10/18/remarks-by-president-biden-on-the-october-7th-terrorist-attacks-and-the-resilience-of-the-state-of-israel-and-its-people-tel-aviv-israel/',
                archiveLink: 'https://archive.ph/yqnZT',
            },
        ]
    },    
 
    {
        claimTitle: 'Forty beheaded babies',
        date: '26 Oct 2023',
        claim: {
            claimText: 'Claim',
            claimTag: 'claim-tag',
        },
        description: {
            summary: 'The official Israel social media account claims ‘one beheaded baby’ and ‘eight burned babies’ at Be’eri kibbutz',
            details: 'In a post on X (formerly Twitter) on 26 October 2023, the official State of Israel account shared a video of an Israel Occupation Forces’ soldier named Col. Golan Vach telling reporters that he carried a decapitated baby in his own hands.<br /><br />The post reads: ‘Listen to the eyewitness accounts of the 8 burned babies and one beheaded baby which were butchered by Hamas terrorists on October 7th. Pure evil.’<br /><br />In the video, Golan Vach states: ‘The baby was decapitated... I carried the baby in my own hands.’<br /><br />When he was asked why there were no photographs, he replied: ‘People ask me how come you did not take a picture. I said: I’m sorry, I have children. I have limitations. I have limits. I do not take a picture of a decapitated baby.’ Golan Vach also claimed a soldier was beheaded at Kfar Aza.',
        },
        sources: [
            {
                sourceName: '@Israel on X',
                sourceLink: 'https://twitter.com/Israel/status/1717553687025815817',
                archiveLink: 'https://files.hasbaratracker.com/GolanVach_12Oct.mp4',
                videoPreviewLink: 'https://files.hasbaratracker.com/GolanVach_12Oct.mp4',
            },
        ]
    },    
 
 
    {
        claimTitle: 'Forty beheaded babies',
        date: '28 Oct 2023',
        claim: {
            claimText: 'Claim',
            claimTag: 'claim-tag',
        },
        description: {
            summary: 'Founder of Israeli first-responded group claims ‘little kids beheaded’',
            details: 'Eli Beer, president and founder of an Israeli first-responder group called United Hatzalah of Israel told the American Republican Jewish Committee in Las Vegas at a conference: ‘I saw little kids who were beheaded. We didn’t know which head belongs to which kid.’ He also claimed a baby was baked in an oven.',
        },
        sources: [
            {
                sourceName: 'New York Post',
                sourceLink: 'https://nypost.com/2023/11/01/news/head-of-israels-ems-service-describes-horror-of-seeing-babies-slaughtered-by-hamas/',
                archiveLink: 'https://files.hasbaratracker.com/EliBeer_28Oct.mp4',
                videoPreviewLink: 'https://files.hasbaratracker.com/EliBeer_28Oct.mp4',
            },
        ]
    },    
 
 
    {
        claimTitle: 'Forty beheaded babies',
        date: '15 Nov 2023',
        claim: {
            claimText: 'Claim',
            claimTag: 'claim-tag',
        },
        description: {
            summary: 'US President Joe Biden repeats beheaded baby claims during APEC press conference',
            details: 'At a press conference on 15 November, 2023, Biden again repeats the debunked claim that Palestinian resistance fighters cut off babies’ heads and burned women and children alive.<br /><br />‘Hamas has already said publicly that they plan on attacking Israel again, like they did before, to where they were cutting babies’ heads off to burning women and children alive.’ Biden’s response is from 12:54 – 13:56.',
        },
        sources: [
            {
                sourceName: 'C-SPAN',
                sourceLink: 'https://www.c-span.org/video/?531876-1/president-biden-holds-news-conference-apec',
                archiveLink: 'https://www.hasbaratracker.com/20231115_CSPAN_BidenAPEC.mp4',
                videoLink: 'https://www.hasbaratracker.com/20231115_CSPAN_BidenAPEC.mp4',
            },
        ]
    },    
 
 
    {
        claimTitle: 'Forty beheaded babies',
        date: '4 Dec 2023',
        claim: {
            claimText: 'Debunk',
            claimTag: 'debunk-tag',
        },
        description: {
            summary: 'Revealed one baby was killed in crossfire between Israel Occupation Forces and Palestinian fighters',
            details: 'Israeli newspaper Ha’aretz reported on 4 December 2023 that according to sources including Israeli state’s National Insurance Institute, kibbutz leaders and the police, one baby was killed in the crossfire between the IOF and Hamas, 10-month-old Mila Cohen, along with her father, Ohad, on Kibbutz Be’eri on 7 October 2023.',
        },
        sources: [
            {
                sourceName: 'Ha’aretz',
                sourceLink: 'https://www.haaretz.com/israel-news/2023-12-04/ty-article-magazine/.premium/hamas-committed-documented-atrocities-but-a-few-false-stories-feed-the-deniers/0000018c-34f3-da74-afce-b5fbe24f0000',
                archiveLink: 'https://archive.ph/H6rAm',
            },
        ]
    },    
 
 
    {
        claimTitle: 'Forty beheaded babies',
        date: '12 Dec 2023',
        claim: {
            claimText: 'Claim',
            claimTag: 'claim-tag',
        },
        description: {
            summary: 'US President Joe Biden repeats that he saw beheaded infants, claims mother and daughter tied up and burnt',
            details: 'In a speech at Salamander Washington D.C., US President Biden once again repeated the claim that babies were beheaded.<br /><br />’I saw some of the photographs when I was there – tying a mother and her daughter together on a rope and then pouring kerosene on them and then burning them, beheading infants, doing things that are just inhuman – totally, completely inhuman.’',
        },
        sources: [
            {
                sourceName: 'The White House',
                sourceLink: 'https://www.whitehouse.gov/briefing-room/speeches-remarks/2023/12/12/remarks-by-president-biden-at-a-campaign-reception-5/',
                archiveLink: 'https://archive.ph/cOJQW',
            },
        ]
    },    
 
    {
        claimTitle: 'Forty beheaded babies',
        date: '26 Dec 2023',
        claim: {
            claimText: 'Claim',
            claimTag: 'claim-tag',
        },
        description: {
            summary: 'Newsweek publishes an opinion article headlined ‘I Saw the Children Hamas Beheaded With My Own Eyes. Shame on Queen Rania’',
            details: 'A pro-Israel British physician published an opinion article in Newsweek which repeated the debunked claim of beheaded babies in the headline. The body of the article does not address the claim in the headline, and repeats unsubstantiated and dubious Israeli claims.',
        },
        sources: [
            {
                sourceName: 'Newsweek',
                sourceLink: 'https://www.newsweek.com/i-saw-children-hamas-beheaded-my-own-eyes-shame-queen-rania-opinion-1855472',
                archiveLink: 'https://archive.ph/vzLEo',
            },
        ]
     },
 
    {
        claimTitle: 'Forty beheaded babies',
        date: '20 Jan 2024',
        claim: {
            claimText: 'Claim',
            claimTag: 'claim-tag',
        },
        description: {
            summary: 'Israeli soldier claims he saw eight babies and elderly woman named Jania killed in Be’eri',
            details: 'In an interview with the Israeli news channel Channel 14, an Israel Occupation Forces commander for the Kfir Brigade, Guy Basson, told interviewer Erel Segal that eight babies were killed in a nursery school, along with a Holocaust survivor with an Auschwitz tattoo named Jania.<br /><br /> Basson said (translated from Hebrew to English): ‘We arrive in Kibbutz Be’eri, and there I encounter two main images of the battle (and the) enemy’s brutality. One is a nursery school, with innocent children. They were butchered. Killed. You see the children inside the house? Eight babies. Eight babies died. And another image that caught my attention is when I saw Jania, may she rest in peace, an elderly woman from Kibbutz Be’eri, and I see the number engraved on her arm. An you say, she went through the Holocaust in Auschwitz, and in the end died in Kibbutz Be’eri. That’s not something that… You can’t even understand it.’',
        },
        sources: [
            {
                sourceName: 'Channel 14',
                sourceLink: 'https://www.youtube.com/watch?v=Nor46pGaiK0',
                archiveLink: 'https://files.hasbaratracker.com/Channel14_Beeri_20Jan.mp4',
                videoPreviewLink: 'https://files.hasbaratracker.com/Channel14_Beeri_20Jan.mp4',
            },
        ]
    },
 
    {
        claimTitle: 'Forty beheaded babies',
        date: '21 Jan 2024',
        claim: {
            claimText: 'Debunk',
            claimTag: 'debunk-tag',
        },
        description: {
            summary: 'Israeli soldier made up eight babies killed in Be’eri and no elderly woman named Jania exists',
            details: 'A spokesperson for Kibbutz Be’eri denied the claims by the IOF commander Guy Basson: ‘The cases described... regarding eight babies who were murdered in the daycare centre and regarding a Holocaust survivor named Jania who was murdered on October 7 didn’t happen’.',
        },
        sources: [
            {
                sourceName: 'Ha’aretz',
                sourceLink: 'https://www.haaretz.com/israel-news/2024-01-21/ty-article/.premium/army-officer-makes-incorrect-claims-on-oct-7-massacre-idf-well-set-record-straight/0000018d-2c67-daf5-a1bf-ac77f9b50000',
                archiveLink: 'https://archive.ph/YFhfZ',
            },
        ]
    },
 
    {
    claimTitle: 'Forty beheaded babies',
    date: '22 Jan 2024',
    claim: {
        claimText: 'Debunk',
        claimTag: 'debunk-tag',
    },
    description: {
        summary: 'Israeli media commentator questions why false claims made about murdered babies',
        details: 'A presenter for the Israeli news channel Channel 13, Raviv Drucker, questions why IOF soldiers continue to make false claims about murdered babies, from beheaded and burnt babies, to babies hung on clothelines, to a pregnant woman being cut open. Guest Mickey Rosenthal, a member of the Israeli state’s Labor Party, stated: ‘Maybe they heard it as a rumour...but, and the most important thing to say in this context, the war is not only military and not only political, it’s mainly a media (war).’',
    },
    sources: [
        {
            sourceName: '@RavivDrucker on X',
            sourceLink: 'https://twitter.com/RavivDrucker/status/1749355249922351352',
            archiveLink: 'https://files.hasbaratracker.com/Channel13_21Jan.mp4',
            videoPreviewLink: 'https://files.hasbaratracker.com/Channel13_21Jan.mp4',
        },
    ]
},
 
 
// Claim: Al-Ahli Hospital was attacked by Palestinian rockets, not Israeli forces
{
    claimTitle: 'Al-Ahli Hospital was attacked by Palestinian rockets, not Israeli forces',
    // claimSummary: 'The Israeli state says Al-Ahli Hospital was attacked by Palestinian rockets',
 
    date: '12 Oct 2023',
 
    claim: {
        claimText: 'Context',
        claimTag: 'context-tag',
    },
 
    description: {
        summary: 'The Israeli state says it has dropped 6,000 bombs on Gaza within the first week of the genocide',
        details: 'As reported by Al Jazeera, the Israeli state said it ‘dropped 6,000 bombs weighing 4,000 tonnes on Gaza’ within the first six days of the attack on Gaza, ‘killing more than 1,400 people’.<br /><br />The number of explosives used to attack Gaza in one week almost amounts to what the US and allied forces used in Afghanistan in all of 2019 – 7,432 bombs. It is the heaviest year of aerial bombardment there since the US Air Force began releasing monthly strike data in 2006.',
    },
    sources: [
        {
            sourceName: 'Al Jazeera',
            sourceLink: 'https://www.aljazeera.com/news/2023/10/12/israel-says-6000-bombs-dropped-on-gaza-as-war-with-hamas-nears-a-week',
            archiveLink: 'https://archive.is/KQ76U',
        },
 
        {
            sourceName: 'The Washington Post',
            sourceLink: 'https://www.washingtonpost.com/world/2023/11/05/israel-strike-targets-gaza-civilians-hamas/',
            archiveLink: 'https://archive.ph/rCJbc',
        },
 
        {
            sourceName: 'USAF 2013–2019 Airpower Statistics',
            sourceLink: 'https://www.afcent.af.mil/Portals/82/Documents/Airpower%20summary/(U)%20APPROVED%20Dec%202019%20APS%20Data.pdf?ver=2020-01-27-023439-697',
            archiveLink: 'https://archive.ph/rYSHV',
        }
    ]
},
 
{
    claimTitle: 'Al-Ahli Hospital was attacked by Palestinian rockets, not Israeli forces',
 
    date: '14 Oct 2023',
 
    claim: {
        claimText: 'Context',
        claimTag: 'context-tag',
    },
 
    description: {
        summary: 'An Israeli airstrike severely damaged two floors of Al-Ahli Hospital’s cancer treatment centre',
        details: 'An Israeli airstrike severely damaged upper two floors of the Al-Ahli Hospital’s Diagnostic Cancer Treatment Centre, which contained the ultrasound and mammography wards, injuring four staff members.<br /><br />The Washington Post reported that an Anglican pastor working for the Anglican diocese filmed a video showing a 155mm artillery illumination shell in the hospital’s ultrasound room.',
    },
    sources: [
        {
            sourceName: 'The Palestine Chronicle',
            sourceLink: 'https://www.palestinechronicle.com/al-ahli-hospital-in-gaza-hit-with-direct-israeli-strike-photos-video/#',
            archiveLink: 'https://archive.is/XIzL9',
        },
 
        {
            sourceName: 'Al Jazeera',
            sourceLink: 'https://www.aljazeera.com/news/liveblog/2023/10/17/israel-hamas-war-live-anger-after-israeli-strike-kills-500-in-hospital?update=2417884',
            archiveLink: 'https://archive.ph/QOf8t',
        },
 
        {
            sourceName: 'The Washington Post',
            sourceLink: 'https://www.washingtonpost.com/investigations/2023/10/26/gaza-hospital-blast-evidence-israel-hamas/',
            archiveLink: 'https://archive.ph/Gksxt',
        }
    ]
},
 
{
    claimTitle: 'Al-Ahli Hospital was attacked by Palestinian rockets, not Israeli forces',
 
    date: '17 Oct 2023',
 
    claim: {
        claimText: 'Context',
        claimTag: 'context-tag',
    },
 
    description: {
        summary: 'Al-Ahli Hospital in Gaza was bombed, killing hundreds',
        details: 'Al-Ahli Hospital in Gaza – also known as Al-Ahli Hospital and Al-Ahli Baptist Hospital – was bombed, killing 471 Palestinians.<br /><br />The Gaza Health Ministry reported on their Facebook page that 342 people were injured.<br /><br />As reported by the United Nations news outlet, Hyo-jeong Kim, Lead of WHO’s Attacks on Health Care Initiative said in a virtual press conference held on 17 October, 2023 21:15 PM CEST that before this bombing, there were at least 51 attacks on health facilities and hospitals in Gaza by Israel Occupation Forces between 7 and 17 October 2023, killing 15 hospital workers and injuring 27 others.',
    },
    sources: [
        {
            sourceName: 'Defense for Children International Palestine',
            sourceLink: 'https://www.dci-palestine.org/hundreds_of_palestinian_men_women_and_children_killed_at_al_ahli_hospital',
            archiveLink: 'https://archive.ph/W2Z4i',
        },
 
        {
            sourceName: 'Ministry of Health Gaza',
            sourceLink: 'https://www.facebook.com/MOHGaza1994/posts/pfbid02VihLzssMVKvwphaoxK71rs9X4fUtNFaXBj9nFamjZ4Z9A56Vu6SZ7GcTLS2yo23fl',
            archiveLink: 'https://archive.ph/5bFAE',
        },
 
        {
            sourceName: 'United Nations',
            sourceLink: 'https://news.un.org/en/story/2023/10/1142472',
            archiveLink: 'https://archive.ph/x36PM',
        }
    ]
},
 
{
    claimTitle: 'Al-Ahli Hospital was attacked by Palestinian rockets, not Israeli forces',
 
    date: '17 Oct 2023',
 
    claim: {
        claimText: 'Claim',
        claimTag: 'claim-tag',
    },
 
    description: {
        summary: 'Israeli military spokesperson Daniel Hagari claimed it is too early to tell whether Israeli forces hit Al-Ahli Hospital',
        details: 'Seen in a video shared on the YouTube channel of Bloomberg Quicktake, the live news platform run by Bloomberg, Daniel Hagari, an IOF spokesperson, said reports of Israeli involvement in an airstrike against Al-Ahli Hospital in Gaza are still under review, attempting to cast doubt on Israeli involvement.',
    },
    sources: [
        {
            sourceName: 'The Times of Israel',
            sourceLink: 'https://www.timesofisrael.com/liveblog_entry/idf-spokesman-says-israel-is-looking-into-alleged-hospital-strike-too-early-to-tell/',
            archiveLink: 'https://archive.ph/szvXg',
        },
        {
            sourceName: 'Bloomberg Quicktake',
            sourceLink: 'https://www.youtube.com/watch?v=FUS0LgMG40k',
            archiveLink: 'https://files.hasbaratracker.com/20231017_BloombergQuicktake_AlAhli.mp4',
            videoPreviewLink: 'https://files.hasbaratracker.com/20231017_BloombergQuicktake_AlAhli.mp4',
        }
    ]
},
 
{
    claimTitle: 'Al-Ahli Hospital was attacked by Palestinian rockets, not Israeli forces',
 
    date: '17 Oct 2023',
 
    claim: {
        claimText: 'Claim',
        claimTag: 'claim-tag',
    },
 
    description: {
        summary: 'Israeli officials claim Al-Ahli Hospital hit by stray Palestinian Islamic Jihad (PIJ) rockets',
        details: 'The Israeli Occupation Forces’ spokesperson account on X (formerly Twitter) @IDFSpokesperson, operated by Daniel Hagari, posts that the hospital was hit by stray Palestinian Islamic Jihad (PIJ) rockets.',
    },
    sources: [
        {
            sourceName: '@IDFSpokesperson on X',
            sourceLink: 'https://twitter.com/IDFSpokesperson/status/1714364921335390340',
            archiveLink: 'https://archive.ph/uO5fn',
        }
    ]
},
 
{
    claimTitle: 'Al-Ahli Hospital was attacked by Palestinian rockets, not Israeli forces',
 
    date: '17 Oct 2023',
 
    claim: {
        claimText: 'Claim',
        claimTag: 'claim-tag',
    },
 
    description: {
        summary: 'Israeli military spokesperson Daniel Hagari claimed ‘no craters can be identified’',
        details: 'In a press briefing, recorded and shared on the official IOF YouTube channel, IOF spokesperson Daniel Hagari claimed that there were no craters at the site of the Al-Ahli Hospital bombing. He said if the Israeli state was behind the attack, ‘we would have seen craters and structural damage to buildings, both of which haven’t been identified in this incident. The size of the damage we see here is due to the warhead of the Islamic Jihad rocket.’<br /><br />Video is incorrectly dated as ‘11.09.23’ – visible in the bottom left corner of the video at timestamp 0:00 – 0:04. The correct date of the video is 17.10.23.',
    },
    sources: [
        {
            sourceName: '@IsraelDefenseForces on YouTube',
            sourceLink: 'https://www.youtube.com/watch?v=mYqlG3dKIFo',
            archiveLink: 'https://files.hasbaratracker.com/HagariBriefing_18Oct2023.mp4',
            videoPreviewLink: 'https://files.hasbaratracker.com/HagariBriefing_preview.mp4',
        }
    ]
},
 
{
    claimTitle: 'Al-Ahli Hospital was attacked by Palestinian rockets, not Israeli forces',
 
    date: '17 Oct 2023',
 
    claim: {
        claimText: 'Claim',
        claimTag: 'claim-tag',
    },
 
    description: {
        summary: 'Social media advisor to Israeli Prime Minister Netanyahu said Israeli Air Force struck the hospital',
        details: 'Hananya Naftali, the social media advisor to Netanyahu since 2018, posted on X (formerly Twitter) saying the Israeli Air Force struck the hospital, claiming it hid a ‘Hamas terrorist base’. The post was swiftly removed and retracted shortly after.<br /><br />The post read: ‘BREAKING: Israeli Air Force struck a Hamas terrorist base inside a hospital in Gaza. A multiple number of terrorists are dead. It’s heartbreaking that Hamas is launching rockets from hospitals, Mosques, schools and using civilians as human shields.’',
    },
    sources: [
        {
            sourceName: '@HananyaNaftali on X',
            sourceLink: 'https://twitter.com/Lowkey0nline/status/1714357150594588816/photo/1',
            archiveLink: 'https://archive.md/EniBp',
        },
 
        {
            sourceName: '@HananyaNaftali on X',
            sourceLink: 'https://twitter.com/HananyaNaftali/status/1714400598991261966',
            archiveLink: 'https://archive.ph/wFeel',
        }
    ]
},
 
{
    claimTitle: 'Al-Ahli Hospital was attacked by Palestinian rockets, not Israeli forces',
 
    date: '17 Oct 2023',
 
    claim: {
        claimText: 'Claim',
        claimTag: 'claim-tag',
    },
 
    description: {
        summary: '@Israel account shared video claiming a Palestinian rocket hit the hospital',
        details: 'The official @Israel X (formerly Twitter) account posted a video claiming an ‘enemy rocket barrage was carried out towards Israel, which passed through the vicinity of the hospital when it was hit’.',
    },
    sources: [
        {
            sourceName: '@Israel on X',
            sourceLink: 'https://twitter.com/Israel/status/1714371894521057737/history',
            archiveLink: 'https://archive.ph/X3PWN',
            videoPreviewLink: 'https://files.hasbaratracker.com/20231017_IsraelonX_RocketVideo.mp4',
        }
    ]
},
 
{
    claimTitle: 'Al-Ahli Hospital was attacked by Palestinian rockets, not Israeli forces',
 
    date: '17 Oct 2023',
 
    claim: {
        claimText: 'Debunk',
        claimTag: 'debunk-tag',
    },
 
    description: {
        summary: '@Israel post was edited to remove the video because it showed an incorrect timestamp',
        details: 'The official @Israel account on X (formerly Twitter) edited its post 22 minutes later to remove the video after New York Times reporter Aric Toler (@AricToler) pointed out the video clip was timestamped at about 8:00 PM, about 40 minutes after the hospital was hit.',
    },
    sources: [
        {
            sourceName: '@Israel on X',
            sourceLinkL: 'https://twitter.com/Israel/status/1714371894521057737',
            archiveLink: 'https://archive.ph/X3PWN',
        }
    ]
},
 
{
    claimTitle: 'Al-Ahli Hospital was attacked by Palestinian rockets, not Israeli forces',
 
    date: '17 Oct 2023',
 
    claim: {
        claimText: 'Claim',
        claimTag: 'claim-tag',
    },
 
    description: {
        summary: 'Israeli ambassador to the US Michael Herzog shared video claiming a Palestinian rocket hit the hospital',
        details: 'One minute later, the Israeli ambassador to the US Michael Herzog posted a video on X (formerly Twitter) on the account @AmbHerzog that claimed to show a rocket fired from Gaza caused the explosion at the hospital. It is the same video the @Israel account removed from their post one minute earlier.',
    },
    sources: [
        {
            sourceName: '@AmbHerzog on X',
            sourceLink: 'https://twitter.com/AmbHerzog/status/1714372064369328514',
            archiveLink: 'https://archive.is/0ufj2',
            videoPreviewLink: 'https://files.hasbaratracker.com/20231017_AmbHerzogX_RocketVideo.mp4',
        }
    ]
},
 
{
    claimTitle: 'Al-Ahli Hospital was attacked by Palestinian rockets, not Israeli forces',
 
    date: '17 Oct 2023',
 
    claim: {
        claimText: 'Debunk',
        claimTag: 'debunk-tag',
    },
 
    description: {
        summary: 'Israeli ambassador to the US Michael Herzog edited X (formerly Twitter) post to remove the video because of incorrect timestamp',
        details: 'The Israeli ambassador to the US Michael Herzog edited his post on X (formerly Twitter) 32 minutes later to remove the video after the official @Israel account removed the video after New York Times reporter Aric Toler (@AricToler) noticed the video clip was timestamped at around 8:00 PM, about 40 minutes after the hospital was hit.',
    },
    sources: [
        {
            sourceName: '@AmbHerzog on X',
            sourceLink: 'https://twitter.com/AmbHerzog/status/1714380191651213499',
            archiveLink: 'https://archive.ph/DMiox',
        }
    ]
},
 
{
    claimTitle: 'Al-Ahli Hospital was attacked by Palestinian rockets, not Israeli forces',
 
    date: '17 Oct 2023',
 
    claim: {
        claimText: 'Claim',
        claimTag: 'claim-tag',
    },
 
    description: {
        summary: 'Israeli official claimed that Israeli forces do not target hospitals',
        details: 'Talya Lankri, a senior reserves officer and the former deputy head of the Israeli state’s National Security Council, said on Israeli TV’s Channel 12 news that ‘the IDF does not hit hospitals. That is not a target.’'
    },
    sources: [
        {
            sourceName: 'The Times of Israel',
            sourceLink: 'https://www.timesofisrael.com/liveblog_entry/idf-says-it-does-not-target-hospitals-is-still-investigating-blast-at-gaza-hospital/',
            archiveLink: 'https://archive.ph/VjZvc',
        }
    ]
},
 
{
    claimTitle: 'Al-Ahli Hospital was attacked by Palestinian rockets, not Israeli forces',
 
    date: '17 Oct 2023',
 
    claim: {
        claimText: 'Claim',
        claimTag: 'claim-tag',
    },
 
    description: {
        summary: 'Social media advisor to Israeli Prime Minister Benjamin Netanyahu deleted post and claimed Israeli forces do not bomb hospitals',
        details: 'Hananya Naftali, the social media advisor to Netanyahu since 2018, posted a statement on X (formerly Twitter) denying that the IOF targets hospitals, despite declaring that the IOF bombed Al-Ahli Hospital hours earlier.<br /><br />The post read:<br /><br />‘Earlier today I shared a report that was published on @reuters about the bombing at the hospital in Gaza which falsely stated Israel struck the hospital. I mistakenly shared this information in a since deleted post in which I referenced Hamas’ routine use of hospitals to store weapons caches and conduct terrorist activity. I apologize for this error. As the IDF does not bomb hospitals, I assumed Israel was targeting one of the Hamas bases in Gaza. It is known that Hamas is using civilians as human shields, it is a war crime and a crime against humanity. This should be the focus.’',
    },
    sources: [
        {
            sourceName: '@HananyaNaftali on X',
            sourceLink: 'https://twitter.com/HananyaNaftali/status/1714400598991261966',
            archiveLink: 'https://archive.ph/k3VEH',
        }
    ]
},
 
{
    claimTitle: 'Al-Ahli Hospital was attacked by Palestinian rockets, not Israeli forces',
 
    date: '17 Oct 2023',
 
    claim: {
        claimText: 'Claim',
        claimTag: 'claim-tag',
    },
 
    description: {
        summary: 'Israeli military posted video claiming a misfired rocket by the Palestinian resistance hit Al-Ahli Hospital',
        details: 'The official @IDF account posted a video on X (formerly Twitter) claiming it shows a misfired at 6:59 PM.<br /><br />The post read: ‘RAW FOOTAGE: A rocket aimed at Israel misfired and exploded at 18:59 – the same moment a hospital was hit in Gaza.’',
    },
    sources: [
        {
            sourceName: '@IDF on X',
            sourceLink: 'https://twitter.com/IDF/status/1714403025136017784',
            archiveLink: 'https://files.hasbaratracker.com/20231017_IDFRocket.mp4',
            videoPreviewLink: 'https://files.hasbaratracker.com/20231017_IDFRocket.mp4',
        }
    ]
},
 
{
    claimTitle: 'Al-Ahli Hospital was attacked by Palestinian rockets, not Israeli forces',
 
    date: '17 Oct 2023',
 
    claim: {
        claimText: 'Claim',
        claimTag: 'claim-tag',
    },
 
    description: {
        summary: 'Israeli military spokesperson shared image claiming to depict Islamic Jihad rocket',
        details: 'Israel Occupation Forces (IOF) spokesperson Daniel Hagari posted an image on the @IDFSpokesperson account on X (formerly Twitter) which depicts rocket flight paths travelling west to east towards Al-Ahli Hospital. The image is labelled as being ‘taken by IDF Radar Footage’.<br /><br />The post read: ‘Attached is a visual related to the failed rocket launch by the Islamic Jihad that hit the Al Ahli hospital.’',
    },
    sources: [
        {
            sourceName: '@IDFSpokesperson on X',
            sourceLink: 'https://twitter.com/IDFSpokesperson/status/1714412497480917100',
            archiveLink: 'https://archive.ph/Q8hBt',
        }
    ]
},
 
{
    claimTitle: 'Al-Ahli Hospital was attacked by Palestinian rockets, not Israeli forces',
 
    date: '18 Oct 2023',
 
    claim: {
        claimText: 'Claim',
        claimTag: 'claim-tag',
    },
 
    description: {
        summary: 'US President Joe Biden blamed ‘errant rocket by a terrorist group in Gaza’ for Al-Ahli Hospital bombing',
        details: 'At a press conference in Tel Aviv in Occupied Palestine (what constitutes the Israeli state today), US President Joe Biden said the attack at Al-Ahli Hospital was caused by an ‘errant rocket fired by a terrorist group in Gaza.’<br /><br />Biden went on to say: ‘Based on the information we’ve seen to date, it appears as a result of an errant rocket fired by a terrorist group in Gaza. The United States unequivocally stands for the protection of civilian life during conflict.’ (heard in the video at 00:12)',
    },
    sources: [
        {
            sourceName: 'NBC News',
            sourceLink: 'https://www.nbcnews.com/politics/white-house/biden-lands-israel-high-stakes-trip-war-hamas-rcna120965',
            archiveLink: 'https://archive.ph/9sndh',
            videoPreviewLink: 'https://files.hasbaratracker.com/20231018_NBCNews_Biden.mp4',
        }
    ]
},
 
{
    claimTitle: 'Al-Ahli Hospital was attacked by Palestinian rockets, not Israeli forces',
 
    date: '18 Oct 2023',
 
    claim: {
        claimText: 'Claim',
        claimTag: 'claim-tag',
    },
 
    description: {
        summary: 'Former Pentagon Chief claimed size of crater at the site of Al-Ahli Hospital attack was inconsistent with US-supplied JDAM munitions used by Israeli military',
        details: 'Marc Garlasco, former Pentagon chief, said he size of craters observed at the Al-Ahli Hospital did not align with the characteristics of the Joint Direct Attack Munition (JDAM) munitions typically used by the Israel Occupation Forces (IOF).<br /><br />He told The Guardian newspaper ‘The number [of casualties] is astronomically high, an absolute high range of all time if true. The crater is not consistent with an airstrike, it is more likely to be a weapon that failed and released its payload over a wide area. The crater and surrounding damage is also not consistent with a JDAM aerial bomb. The hole on the ground occurred from kinetic energy.’',
    },
    sources: [
        {
            sourceName: 'The Guardian',
            sourceLink: 'https://www.theguardian.com/world/2023/oct/18/al-ahli-arab-hospital-piecing-together-what-happened-as-israel-insists-militant-rocket-to-blame',
            archiveLink: 'https://archive.is/NOIAT',
        }
    ]
},
 
{
    claimTitle: 'Al-Ahli Hospital was attacked by Palestinian rockets, not Israeli forces',
 
    date: '18 Oct 2023',
 
    claim: {
        claimText: 'Claim',
        claimTag: 'claim-tag',
    },
 
    description: {
        summary: 'Israeli state released an alleged interecepted phone call between Hamas members',
        details: 'The official @Israel account on X (formerly Twitter) posted a recording claiming it is a conversation between two Hamas members. The post read:<br /><br />‘Hamas terrorists in their own voices:<br /><br />Listen to the conversation between Hamas operatives as they discuss the failed Islamic Jihad rocket launch on the Al-Ahli Baptist Hospital on October 17, 2023.’<br /><br />The video is titled: ‘A Recording of a Conversation Regarding the Hospital Launch Incident by the Islamic Jihad Terror Organization 17.10.2023’<br /><br />The video is titled: ‘A Recording of a Conversation Regarding the Hospital Launch Incident by the Islamic Jihad Terror Organization 17.10.2023’<br /><br />Note that the following video has evident errors in attributing voices and quotes to alleged operatives. We are attributing it to each voice accordingly due to editing errors by the IOF.<br /><br />Video Transcript:<br /><br />Speaker 1: ‘I’m telling you this is the first time we see a missile like this falling and so that‘s why we are saying it belongs to the Palestinian Islamic Jihad.’<br /><br />Speaker 2: ‘What?’<br /><br />Speaker 1: ‘They are are saying it belongs to Palestinian Islamic Jihad.’<br /><br />Speaker 2: ‘It’s from us?’<br /><br />Speaker 1: ‘It looks like it.’<br /><br />Speaker 2: ‘Who says this.’<br /><br />Speaker 1: ‘They are saying that the shrapnel from the missile is local shrapnel and not like Israeli shrapnel.’<br /><br />Speaker 2: ‘What are you saying (name redacted)?’<br /><br />Speaker 1: (Silence)',
    },
    sources: [
        {
            sourceName: '@Israel on X',
            sourceLink: 'https://twitter.com/Israel/status/1714545680562184434',
            archiveLink: 'https://files.hasbaratracker.com/IsraelAlAhliRecording_18Oct2023.mp4',
            videoPreviewLink: 'https://files.hasbaratracker.com/IsraelAlAhliRecording_18Oct2023.mp4',
        }
    ]
},
 
{
    claimTitle: 'Al-Ahli Hospital was attacked by Palestinian rockets, not Israeli forces',
 
    date: '18 Oct 2023',
 
    claim: {
        claimText: 'Claim',
        claimTag: 'claim-tag',
    },
 
    description: {
        summary: 'Israeli military presented material alleging the massacre at Al-Ahli Hospital was by Palestinian rockets fired from a cemetery',
        details: 'The Israel Occupation Forces (IOF) issued a press release, briefing video, and files asserting that Palestinian Islamic Jihad (PIJ) fired rockets from a nearby cemetery, resulting in a misfire that struck Al-Ahli Hospital.<br /><br /><b>The provided files include:</b><br /><br />Aerial maps claimed by the IOF to exhibit no signs of craters or blast damage to buildings, with a comparison of IOF crater sizes.<br />An image illustrating rocket flight paths travelling from west to east.<br />An alleged phone conversation between PIJ members admitting to the rocket failure.',
    },
    sources: [
        {
            sourceName: 'IDF Media Releases',
            sourceLink: 'https://www.idf.il/en/mini-sites/idf-press-releases-regarding-the-hamas-israel-war/october-pr/failed-rocket-launch-by-islamic-jihad-hits-Al Ahli-hospital-in-gaza-city/',
            archiveLink: 'https://archive.ph/V1Xen',
            hasBeenDeleted: 'true',
        },
        {
            sourceName: '@IsraelDefenseForces on YouTube',
            sourceLink: 'https://files.hasbaratracker.com/HagariBriefing_18Oct2023.mp4',
            videoPreviewLink: 'https://files.hasbaratracker.com/HagariBriefing_18Oct2023.mp4',
        }
    ]
},
 
{
    claimTitle: 'Al-Ahli Hospital was attacked by Palestinian rockets, not Israeli forces',
 
    date: '18 Oct 2023',
 
    claim: {
        claimText: 'Debunk',
        claimTag: 'debunk-tag',
    },
 
    description: {
        summary: 'Bellingcat geolocated videos contradicting Israel Occupation Forces (IOF) claims of no craters',
        details: 'Open-source investigative group Bellingcat employed geolocation techniques on videos sourced from Telegram and X (formerly Twitter), presenting evidence of craters and blast damage to buildings. These findings stand in contrast to the claims made in the Israeli military press release and briefing of no craters.',
    },
    sources: [
        {
            sourceName: 'Bellingcat',
            sourceLink: 'https://www.bellingcat.com/news/2023/10/18/identifying-possible-crater-from-gaza-hospital-blast/',
            archiveLink: 'https://archive.ph/L3ohJ',
        },
        {
            sourceName: 'IDF Media Releases',
            sourceLink: 'https://idfanc.activetrail.biz/ANC1810156854',
            archiveLink: 'https://archive.ph/to7Az',
        }
    ]
},
 
{
    claimTitle: 'Al-Ahli Hospital was attacked by Palestinian rockets, not Israeli forces',
 
    date: '18 Oct 2023',
 
    claim: {
        claimText: 'Claim',
        claimTag: 'claim-tag',
    },
 
    description: {
        summary: 'US spokesperson said Israeli state not responsible for hospital attack',
        details: 'The US National Security Council Spokesperson Adrienne Watson posted on X (formerly Twitter) from the account @NSC_Spox that the Israeli state is not responsible for the hospital attack, based on analysis of ‘overhead imagery, intercepts and open source information’.<br /><br />The post read: ‘While we continue to collect information, our current assessment, based on analysis of overhead imagery, intercepts and open source information, is that Israel is not responsible for the explosion at the hospital in Gaza yesterday.’',
    },
    sources: [
        {
            sourceName: '@NSC_Spox on X',
            sourceLink: 'https://twitter.com/NSC_Spox/status/1714654402118832440',
            archiveLink: 'https://archive.ph/82Sbc',
        }
    ]
},
 
{
    claimTitle: 'Al-Ahli Hospital was attacked by Palestinian rockets, not Israeli forces',
 
    date: '19 Oct 2023',
 
    claim: {
        claimText: 'Claim',
        claimTag: 'claim-tag',
    },
 
    description: {
        summary: 'Israeli army spokesman said crater ‘too small’ to be caused by Israeli bombs',
        details: 'The @IDF X (formerly Twitter) account broadcasted a video briefing featuring the Israeli army’s international spokesperson Jonathan Conricus. He pointed to a TV screen showing footage and images. At the 08:38 mark, he stated that the ‘only picture of a crater is here in this area... and it’s a very small one’. He claimed Palestinian rockets ‘misfired’ from a nearby cemetery.<br /><br />‘Scroll through pictures of rockets that impacted in Sderot, Ashkelon, in Be’er-Sheva, unfortunately there are many of those pictures, you’ll see very very similar sites... a small crater, lots of soot and fire remarks and you can see, by the way, that all of the buildings around are generally intact. If a big Israeli bomb had been dropped here, none of this would have been intact.’',
    },
    sources: [
        {
            sourceName: '@IDF on X',
            sourceLink: 'https://twitter.com/i/broadcasts/1BRJjPbkaRQKw',
            archiveLink: 'https://files.hasbaratracker.com/20231019_IDFBriefing_JonathanConricus.mp4',
            videoPreviewLink: 'https://files.hasbaratracker.com/20231019_IDFBriefing_JonathanConricus_preview.mp4',
        }
    ]
},
 
{
    claimTitle: 'Al-Ahli Hospital was attacked by Palestinian rockets, not Israeli forces',
 
    date: '19 Oct 2023',
 
    claim: {
        claimText: 'Debunk',
        claimTag: 'debunk-tag',
    },
 
    description: {
        summary: 'Inconsistencies in Israeli military spokesperson’s map of Al-Ahli Hospital site found',
        details: 'UK state broadcaster‘s fact checking team BBC Verify noted that Israel Occupation Forces (IOF) spokesperson Jonathan Cornicus claimed Palestinian Islamic Jihad (PIJ) rockets were fired from a nearby cemetery next to the hospital. However, the map displayed by Cornicus showed a launch site further away. BBC Verify say they have not been able to locate a cemetery there.',
    },
    sources: [
        {
            sourceName: 'BBC',
            sourceLink: 'https://www.bbc.co.uk/news/world-middle-east-67144061',
            archiveLink: 'https://archive.ph/ZJYdH',
        }
    ]
},
 
{
    claimTitle: 'Al-Ahli Hospital was attacked by Palestinian rockets, not Israeli forces',
 
    date: '19 Oct 2023',
 
    claim: {
        claimText: 'Claim',
        claimTag: 'claim-tag',
    },
 
    description: {
        summary: 'The Pentagon said ‘physical evidence’ proved that the Israeli forces did not strike the hospital',
        details: 'US news outlet ABC News reported that they were told by two US officials that the Pentagon ‘independently concluded the Gaza hospital blast was likely caused by a Palestinian Islamic Jihad (PIJ) rocket that fell short of its target’.<br /><br />In an interview with the Israeli news channel i24, Joel Rayburn, Director of the American Centre for Levant Studies and former US Special Envoy for Syria, expanded on this conclusion by saying: ’If it had been a bomb dropped by an aircraft, the crater would have been massive.’ – timestamp 00:19.',
    },
    sources: [
        {
            sourceName: 'ABC News',
            sourceLink: 'https://abcnews.go.com/International/us-initial-independent-review-shows-evidence-bomb-strike/story?id=104126146',
            archiveLink: 'https://archive.ph/lM2b4',
        },
 
        {
            sourceName: 'i24 News',
            archiveLink: 'https://www.youtube.com/watch?v=jaN8TUSHYyM',
            videoPreviewLink: 'https://files.hasbaratracker.com/20231019_i24_JoelRayburn.mp4',
        }
    ]
},
 
{
    claimTitle: 'Al-Ahli Hospital was attacked by Palestinian rockets, not Israeli forces',
 
    date: '20 Oct 2023',
 
    claim: {
        claimText: 'debunk',
        claimTag: 'debunk-tag',
    },
 
    description: {
        summary: 'Joint 3D analysis by investigative human rights groups showed strike came from northeast, not west as Israeli state claims',
        details: 'Investigative human rights groups Forensic Architecture, Palestinian human rights organisation Al-Haq and and audio investigation organisation Earshot released preliminary analysis on X (formerly Twitter) indicating that there are ‘patterns of radial fragmentation on the southwest side of the impact crater, as well as a shallow channel leading into the crater from the northeast. Such patterns indicate a likely projectile trajectory with northeast origins’.<br /><br />This ‘casts significant doubt on IOF claims that the source of the deadly explosion was a Palestinian-fired rocket travelling west to east.’<br /><br />Chris Cobb-Smith, a war crimes investigator and explosive weapons expert reviewed the analysis and agreed that the fragmentation patterns ‘may indicate the projectile came from the northeast – the direction of the Israeli-controlled side of the Gaza perimeter – and not from the west, as claimed by the IOF.’<br /><br />@ForensicArchi @alhaq_org @earshot_ngo',
    },
    sources: [
        {
            sourceName: '@ForensicArchi on X',
            sourceLink: 'https://twitter.com/ForensicArchi/status/1715422493274427414',
            archiveLink: 'https://archive.ph/i6iZa',
        },
 
        {
            sourceName: '@ForensicArchi on X',
            sourceLink: 'https://twitter.com/ForensicArchi/status/1715422493274427414',
            archiveLink: 'https://archive.ph/RdRuI',
        },
 
        {
            sourceName: '@ForensicArchi on X',
            sourceLink: 'https://twitter.com/ForensicArchi/status/1715422505035235474',
            archiveLink: 'https://archive.ph/j8XZR',
        }
    ]
},
 
{
    claimTitle: 'Al-Ahli Hospital was attacked by Palestinian rockets, not Israeli forces',
 
    date: '20 Oct 2023',
 
    claim: {
        claimText: 'debunk',
        claimTag: 'debunk-tag',
    },
 
    description: {
        summary: 'The missile travelled for 4km and could not have been fired from nearby cemetery as Israeli officials claim',
        details: 'However, according to videos available online, including one aired by Al Jazeera Mubasher showing the moment the hospital was bombed, the missile was in the air for approximately 13 seconds before exploding. This indicates it covered a distance of at least 4 kilometers, which is quite far and somewhat aligns with the hospital surroundings.',
    },
    sources: [
        {
            sourceName: 'Al Jazeera Mubasher',
            sourceLink: 'https://twitter.com/yousuf_tw/status/1714367757968384106',
            archiveLink: 'https://files.hasbaratracker.com/20231020_%40ajmubasher.mp4',
            videoPreviewLink: 'https://files.hasbaratracker.com/20231020_%40ajmubasher.mp4',
        }
    ]
},
 
{
    claimTitle: 'Al-Ahli Hospital was attacked by Palestinian rockets, not Israeli forces',
 
    date: '20 Oct 2023',
 
    claim: {
        claimText: 'Debunk',
        claimTag: 'debunk-tag',
    },
 
    description: {
        summary: 'Audio analysis of alleged intercepted call between Hamas members revealed it was manipulated digitally by the Israeli state',
        details: 'Audio investigations organisation Earshot assessed the audio which revealed that the voices of the two ‘Hamas operatives’ are divided across two channels. If a call was intercepted, both voices would be on the same single monophonic audio channel.<br /><br />Post 3: ‘The fact that this recording is made up of two separate channels demonstrates that these two voices have been recorded independently. These two independent recordings have then been edited together with added effects (such as pan control).’<br /><br />Post 4: ‘Though this audio analysis cannot categorically state that the audible dialogue is fake, <a href="https://earshot.ngo/" target="_blank">Earshot.ngo</a>’s opinion is that the level of manipulation required to edit these two voices together disqualifies it as a source of credible evidence.’<br /><br />Earshot posted its analysis on X (formerly Twitter) at @earshot.ngo in a 4-part post.',
    },
    sources: [
        {
            sourceName: '@earshot_ngo on X',
            sourceLink: 'https://twitter.com/ForensicArchi/status/1724525673325199410',
            archiveLink: 'https://archive.ph/OF8Lb',
            videoPreviewLink: 'https://files.hasbaratracker.com/Earshot1.mp4',
        }
    ]
},
 
{
    claimTitle: 'Al-Ahli Hospital was attacked by Palestinian rockets, not Israeli forces',
 
    date: '21 Oct 2023',
 
    claim: {
        claimText: 'Debunk',
        claimTag: 'debunk-tag',
    },
 
    description: {
        summary: 'Audio investigation of missile shows a rocket could not have travelled west as the Israeli state claimed',
        details: 'Audio investigations organisation Earshot mapped the pitch of the doppler on the rocket/missile sound and concludes the launch would have come from the east side of the hospital, not the west as the IOF claimed.',
    },
    sources: [
        {
            sourceName: 'Channel 4',
            sourceLink: 'https://www.youtube.com/watch?v=MVQALHmgo8U',
            archiveLink: 'https://files.hasbaratracker.com/Channel4_Earshot_21Oct2023.mp4',
            videoPreviewLink: 'https://files.hasbaratracker.com/Channel4_Earshot_preview.mp4',
        }
    ]
},
 
{
    claimTitle: 'Al-Ahli Hospital was attacked by Palestinian rockets, not Israeli forces',
 
    date: '24 Oct 2023',
 
    claim: {
        claimText: 'Claim',
        claimTag: 'claim-tag',
    },
 
    description: {
        summary: 'Anonymous US intelligence officials said they are confident blast not by Israeli forces',
        details: 'In security briefings to reporters over the phone, US intelligence officials said they have ‘high confidence’ the attack was caused by misfired Palestinian rockets. They based this on analysed videos of the projectiles’ flight path, and an examination of the blast site.',
    },
    sources: [
        {
            sourceName: 'Politico',
            sourceLink: 'https://www.politico.com/news/2023/10/24/gaza-hospital-us-israel-hamas-00123365',
            archiveLink: 'https://archive.ph/84ciI',
        }
    ]
},
 
{
    claimTitle: 'Al-Ahli Hospital was attacked by Palestinian rockets, not Israeli forces',
 
    date: '13 Nov 2023',
 
    claim: {
        claimText: 'Debunk',
        claimTag: 'debunk-tag',
    },
 
    description: {
        summary: 'Palestinian-British surgeon Doctor Ghassan Abu Sitta reported ongoing Israeli attacks by remote-controlled quadcopters',
        details: 'In a voice note to the UK news outlet The Telegraph, Palestinian-British doctor Doctor Ghassan Abu Sitta said remote-controlled quadcopters equipped with rifles have been firing at Al-Ahli Hospital, which continued to be a target after the first attacks. Dr Abu Sitta was treating patients and sheltering in the hospital along with thousands of displaced Palestinians in Gaza. Palestinians are referred to it as a quadcopter, a large drone mounted with a gun.<br /><br />Dr Abu Sitta said the drones were hovering in ‘the vicinity of the hospital’ and were firing ‘single bullets’.',
    },
    sources: [
        {
            sourceName: 'The Telegraph',
            sourceLink: 'https://www.telegraph.co.uk/global-health/terror-and-security/armed-drones-israel-hamas-war-gaza-hospitals-gunshots/',
            archiveLink: 'https://archive.ph/fmJMi',
        }
    ]
},
 
{
    claimTitle: 'Al-Ahli Hospital was attacked by Palestinian rockets, not Israeli forces',
 
    date: '14 Nov 2023',
 
    claim: {
        claimText: 'Debunk',
        claimTag: 'debunk-tag',
    },
 
    description: {
        summary: 'Forensic Architecture and Al-Haq debunked Israeli claims on rocket misfires',
        details: 'In a 7-post thread on X (formerly Twitter), investigative human rights group Forensic Architecture and Palestinian human rights organisation Al-Haq debunked Israeli spokespeople in the media who presented evidence of rockets misfired.<br /><br />@ForensicArchi @alhaq_org',
    },
    sources: [
        {
            sourceName: '@ForensicArchi on X',
            sourceLink: 'https://twitter.com/ForensicArchi/status/1724525673325199410',
            archiveLink: 'https://archive.ph/OF8Lb',
            videoPreviewLink: 'https://files.hasbaratracker.com/20231114_ForensicArchiAlAhli.mp4',
        }
    ]
},
 
{
    claimTitle: 'Al-Ahli Hospital was attacked by Palestinian rockets, not Israeli forces',
 
    date: '26 Nov 2023',
 
    claim: {
        claimText: 'Claim',
        claimTag: 'claim-tag',
    },
 
    description: {
        summary: 'Human Rights Watch – inconclusive and without evidence – suggested misfired rockets hit Al-Ahli Hospital',
        details: 'International NGO Human Rights Watch released a report suggesting the strike came from misfired rockets but does not provide evidence or come to any conclusion. The report read: ‘There are no known images of any munition remnants publicly available, and Human Rights Watch was unable to visit the scene, preventing conclusive identification of the munition.<br /><br />However, the sound preceding the explosion, the fireball that accompanied it, the size of the resulting crater, the type of splatter adjoining it, and the type and pattern of fragmentation visible around the crater are all consistent with the impact of a rocket.’<br /><br />The report has since been removed from their website.',
    },
    sources: [
        {
            sourceName: 'Human Rights Watch',
            sourceLink: 'https://www.hrw.org/news/2023/11/26/gaza-findings-october-17-Al Ahli-hospital-explosion',
            archiveLink: 'https://archive.ph/cLgSV',
        }
    ]
},
 
{
    claimTitle: 'Al-Ahli Hospital was attacked by Palestinian rockets, not Israeli forces',
    date: '15 Dec 2023',
    claim: {
        claimText: 'Debunk',
        claimTag: 'debunk-tag',
    },
 
    description: {
        summary: 'UN aid worker recounted Israeli machine gun attacks during emergency medical supply delivery',
        details: 'Jake Morland, an aid worker with the UN, described delivering emergency medical supplies to Al-Ahli Hospital with a convoy of ambulances. Morland told the UK state broadcaster BBC that IOF soldiers were aiming machine guns at Palestinian paramedics and UN vehicles on the way to the hospital. The ambulances were shot at by IOF on their journey. He describes the ongoing deaths at Al-Ahli Hospital when they arrived.',
    },
    sources: [
        {
            sourceName: 'BBC',
            sourceLink: 'https://www.bbc.co.uk/news/world-middle-east-67732347',
            archiveLink: 'https://archive.ph/WG83l',
        }
    ]
},
 
{
    claimTitle: 'Al-Ahli Hospital was attacked by Palestinian rockets, not Israeli forces',
    date: '17 Dec 2023',
    claim: {
        claimText: 'Context',
        claimTag: 'context-tag',
    },
    description: {
        summary: 'Israeli forces targeted hospital officials at Kamal Adwan Hospital during press conference',
        details: 'In a video shared by Al Jazeera, the Israeli military targeted another hospital, firing at Palestinian health officials giving a press conference at Kamal Adwan Hospital.',
    },
    sources: [
        {
            sourceName: '@AJEnglish on X',
            sourceLink: 'https://twitter.com/AJEnglish/status/1736408607221051505',
            archiveLink: 'https://files.hasbaratracker.com/AlJazeera_KamalAdwanHospitalAttack.mp4',
            videoPreviewLink: 'https://files.hasbaratracker.com/AlJazeera_KamalAdwanHospitalAttack.mp4',
        }
    ]
},
 
{
    claimTitle: 'Al-Ahli Hospital was attacked by Palestinian rockets, not Israeli forces',
 
    date: '17 Dec 2023',
 
    claim: {
        claimText: 'Debunk',
        claimTag: 'debunk-tag',
    },
 
    description: {
        summary: 'Al-Ahli Hospital surgeon’s daughter reported continued Israeli shelling and attacks',
        details: 'Nour Naim, the daughter of Al-Ahli Hospital‘s Head of Orthopaedic Surgery Fadel Naim, shared reports on X (formerly Twiter) from her father of continued shelling by Israel Occupation Forces (IOF) targeting the hospital, tanks firing at doctors trying to return, and snipers aiming at people inside the hospital. The post was made under the account @NourNaim88.<br /><br />The post read:<br /><br />‘🚨In a phone call with my father<br /><br />@fnaim65<br /><br />from Al-Ahli Baptist Hospital #Gaza , after communication was cut off 🧵:<br /><br />– The hospital temporarily stopped operating due to intense and targeted shelling on its surroundings since yesterday.’',
    },
    sources: [
        {
            sourceName: '@NourNaim88 on X',
            sourceLink: 'https://twitter.com/NourNaim88/status/1736433314569785752',
            archiveLink: 'https://archive.is/eWTwp',
        }
    ]
},
 
{
    claimTitle: 'Al-Ahli Hospital was attacked by Palestinian rockets, not Israeli forces',
 
    date: '18 Oct 2023',
 
    claim: {
        claimText: 'Context',
        claimTag: 'context-tag',
    },
 
    description: {
        summary: 'Doctor Ghassan Abu Sitta reported hospitals in Gaza were being re-targeted by Israeli forces',
        details: 'Dr. Ghassan Abu Sitta said hospitals were being re-targeted by Israeli forces, including Al-Awda (17 December, 2023), and Al-Shifa and Al-Ahli (18 December, 2023). In a post shared on X (formerly Twitter), Dr. Abu Sitta wrote: ‘Palestinian hospitals giving any health care, even as a First Aid stations, are being re-targeted by the Israeli army. Yesturday it was Al Awda hospital. Morning they shelled Shifa Hospital. This afternoon they attacked Al Ahli hospital and are rounding up the staff and wounded.’<br /><br />The post was made under the account @GhassanAbuSitt1.',
    },
    sources: [
        {
            sourceName: '@GhassanAbuSitt1 on X',
            sourceLink: 'https://twitter.com/GhassanAbuSitt1/status/1736795847034081366',
            archiveLink: 'https://archive.ph/CiTay',
        }
    ]
},
 
{
    claimTitle: 'Al-Ahli Hospital was attacked by Palestinian rockets, not Israeli forces',
 
    date: '19 Dec 2023',
 
    claim: {
        claimText: 'Debunk',
        claimTag: 'debunk-tag',
    },
 
    description: {
        summary: 'Al-Ahli Hospital shut down due to ongoing Israeli attacks and detentions',
        details: 'Fadel Naim, Al-Ahli’s head of orthopaedic surgery, told news wire AFP that Al-Ahli Hospital had continued to be attacked. He said doctors, medical staff and patients had been detained by the Israel Occupation Forces (IOF) and soldiers had destroyed part of the building’s grounds.',
    },
    sources: [
        {
            sourceName: 'The New Arab',
            sourceLink: 'https://www.newarab.com/news/gazas-baptist-hospital-out-action-after-israeli-assault',
            archiveLink: 'https://archive.ph/yDJA2',
        }
    ]
},
 
{
    claimTitle: 'Al-Ahli Hospital was attacked by Palestinian rockets, not Israeli forces',
    date: '20 Dec 2023',
    claim: {
        claimText: 'Context',
        claimTag: 'context-tag',
    },
    description: {
        summary: 'Israeli military continued targeting hospitals, multiple missiles hit the Kuwaiti Hospital',
        details: 'Israel Occupation Forces (IOF) continued to target hospitals. The Kuwaiti Hospital in Rafah was attacked by multiple missiles while Al-Jazeera journalist Hani Mahmoud was reporting live on air for Al Jazeera English.',
    },
    sources: [
        {
            sourceName: 'Al Jazeera',
            sourceLink: 'https://twitter.com/AJEnglish/status/1737451718676230618',
            archiveLink: 'https://archive.ph/G7vud',
            videoPreviewLink: 'https://files.hasbaratracker.com/AlJazeera_20Dec2023.mp4',
        }
    ]
},
 
 
 
// Claim: Israeli state offered fuel to Al-Shifa Hospital and it was refused by Hamas
{
    claimTitle: 'Israeli state offered fuel to Al-Shifa Hospital and it was refused by Hamas',
    date: '9 Oct 2023',
    claim: {
        claimText: 'Context',
        claimTag: 'context-tag',
    },
    description: {
        summary: 'Israeli Defence Minister Yoav Gallant calls for complete siege: No power, food or gas allowed into Gaza',
        details: 'On 9 October, 2023, Israeli Defence Minister Yoav Gallant said that he had ‘ordered a full siege on the Gaza Strip’ with ‘no power, no food, no gas’ allowed in. On the same day, the Israeli state also decided to cease its water supply to Gaza.',
    },
    sources: [
        {
            sourceName: 'Al Jazeera',
            sourceLink: 'https://www.aljazeera.com/news/2023/10/9/israel-announces-total-blockade-on-gaza',
            archiveLink: 'https://archive.ph/RTiNA',
            videoLink: 'https://files.hasbaratracker.com/YoavGallant_IOF_Siege_Gaza.mp4',
        }
    ]
},
 
{
    claimTitle: 'Israeli state offered fuel to Al-Shifa Hospital and it was refused by Hamas',
    date: '9 Oct 2023',
    claim: {
        claimText: 'Context',
        claimTag: 'context-tag',
    },
    description: {
        summary: 'Israeli Energy Minister Israel Katz: ‘No fuel truck will enter’',
        details: 'The Israeli Energy Minister Israel Katz posted on X (formerly Twitter): <br><br>‘Humanitarian aid to Gaza? No electrical switch will be turned on, no water hydrant will be opened, and no fuel truck will enter until the Israeli abductees are returned home. Humanitarian for humanitarian. And no one will preach us morals.’',
    },
    sources: [
        {
            sourceName: 'X',
            sourceLink: 'https://twitter.com/Israel_katz/status/1712356130377113904',
            archiveLink: 'https://archive.ph/Am4Xe',
            videoLink: ''
        }
    ]
},
 
{
    claimTitle: 'Israeli state offered fuel to Al-Shifa Hospital and it was refused by Hamas',
    date: '3 Nov 2023',
    claim: {
        claimText: 'Context',
        claimTag: 'context-tag'
    },
 
    description: {
        summary: 'Israeli forces hit ambulance convoy leaving Al-Shifa Hospital with airstrikes',
        details: 'An Israeli airstrike targeted an ambulance convoy leaving Al-Shifa Hospital, killing 15 Palestinians and injuring 60. <br><br> The Israeli state claimed Hamas was using the ambulances – an unfounded claim. <br><br> The Palestine Red Crescent Society also reported that the Israeli state targeted Al-Shifa ambulances seven times before this attack and killed four of their staff.'
    },
    sources: [
        {
            sourceName: 'Palestine Red Crescent Society on X',
            sourceLink: 'https://twitter.com/PalestineRCS/status/1720579687682838812',
            archiveLink: 'https://archive.ph/9gvAk',
        },
 
        {
            sourceName: 'Palestine Red Crescent Society',
            sourceLink: 'https://www.palestinercs.org/public/files/image/2023/News/112023/PRCS%20Statement%2003112023.pdf',
            archiveLink: 'https://archive.ph/TZY0m',
        },
 
        {
            sourceName: 'CNN',
            sourceLink: 'https://www.cnn.com/2023/11/03/middleeast/casualties-gazas-shifa-hospital-idf/index.html',
            archiveLink: 'https://archive.ph/guy5q',
        },
 
        {
            sourceName: 'The Guardian',
            sourceLink: 'https://www.youtube.com/watch?v=8LAWhj4MLMs',
            videoPreviewLink: 'https://files.hasbaratracker.com/Nov_2023_TheGuardian_israeli_airstrike_ambulance.mp4'
        }
    ]
},
 
{
    claimTitle: 'Israeli state offered fuel to Al-Shifa Hospital and it was refused by Hamas',
    date: '6 Nov 2023',
    claim: {
        claimText: 'Context',
        claimTag: 'context-tag'
    },
 
    description: {
        summary: 'Solar panels at Al-Shifa Hospital destroyed by Israeli forces',
        details: 'Israeli forces destroyed the solar panels atop the hospital, leaving it fully reliant on back-up generators powered by dwindling fuel supplies. <br><br>Dr. Ghassan Abu Sitta, a Palestinian-British surgeon treating Palestinians at Al-Shifa Hospital, posted on X (formerly Twitter): ‘Israel just hit the solar panels on the roof of Shifa hospital. Shifa MUST go dark. Israeli necropolitics means it needs to declare victory over a hospital.‘ <br><br> Cameraman Omar Abu Nada posted a video on Instagram showing and describing the damage of the solar panels at Al-Shifa Hospital. <br><br> The Israeli state denies destroying solar panels.'
    },
    sources: [
        {
            sourceName: 'Dr. Ghassan Abu Sitta on X',
            sourceLink: 'https://twitter.com/GhassanAbuSitt1/status/1721545920322375747',
            archiveLink: 'https://archive.ph/y3ygE',
        },
 
        {
            sourceName: 'Al Jazeera',
            sourceLink: 'https://www.aljazeera.com/news/2023/11/6/israeli-forces-target-solar-panels-at-gazas-al-shifa-hospital',
            archiveLink: 'https://archive.ph/e8FNi',
        },
 
        {
            sourceName: 'Cameraman Omar Abu Nada on Instagram',
            sourceLink: 'https://www.instagram.com/reel/CzTlWjcNixb/',
            videoPreviewLink: 'https://files.hasbaratracker.com/06Nov2023_AlShifa_Hospital_Solar_Panels_Targeted.mp4'
        }
    ]
},
 
{
    claimTitle: 'Israeli state offered fuel to Al-Shifa Hospital and it was refused by Hamas',
    date: '9 Nov 2023',
    claim: {
        claimText: 'Context',
        claimTag: 'context-tag'
    },
    description: {
        summary: 'Israeli forces bomb Al-Shifa Hospital multiple times',
        details: 'Israeli strikes hit the yard of the Al-Shifa Hospital complex. Gaza’s Health Ministry spokesperson Ashraf al-Qudra told Al Jazeera Arabic that there were a number of casualties. <br><br> ‘The medical teams are still inspecting the area to find out if there were dead or wounded [victims],’ he said.'
    },
 
    sources: [
        {
            sourceName: 'Al Jazeera',
            sourceLink: 'https://www.aljazeera.com/news/liveblog/2023/11/9/israel-gaza-war-live-day-34',
            archiveLink: 'https://archive.is/2goqX',
        }
    ]
},
 
{
    claimTitle: 'Israeli state offered fuel to Al-Shifa Hospital and it was refused by Hamas',
    date: '10 Nov 2023',
    claim: {
        claimText: 'Context',
        claimTag: 'context-tag'
    },
    description: {
        summary: 'Red Cross attempt to deliver medical supplies to Gaza hospitals under horrendous circumstances',
        details: 'In a press release, the International Committee of the Red Cross (ICRC) said staff attempting to deliver medical supplies had witnessed ‘horrendous’ scenes, and described the destruction as ‘unbearable’. ICRC called for the respect and protection of medical facilities, patients, and healthcare workers in Gaza.<br><br>The release stated: ‘Overstretched, running on thin supplies and increasingly unsafe, the healthcare system in Gaza has reached a point of no return risking the lives of thousands of wounded, sick, and displaced people.’'
    },
    sources: [
        {
            sourceName: 'International Committee of the Red Cross',
            sourceLink: 'https://www.icrc.org/en/document/israel-and-occupied-territories-icrc-demands-protection-patients-healthcare-workers-medical-facilities-in-gaza',
            archiveLink: 'https://archive.is/qcrZx',
            videoPreviewLink: ''
        }
    ]
},
 
{
    claimTitle: 'Israeli state offered fuel to Al-Shifa Hospital and it was refused by Hamas',
    date: '11 Nov 2023',
    claim: {
        claimText: 'Context',
        claimTag: 'context-tag'
    },
    description: {
        summary: 'Israeli army destroys critical infrastructure, surgeries have stopped, neonatal incubators lose power, amputations without anaesthesia at Al-Shifa Hospital',
        details: 'Al-Shifa Hospital continued to face intensified bombardment. Doctors Without Borders/Médecins Sans Frontières (MSF) reported that critical infrastructure, including the oxygen station, water tanks and a well, the cardiovascular facility, and the maternity ward, were damaged, and three nurses were killed. At least two premature babies died on 11 November, 2023, when the hospital ran out of electricity to power its incubators, staff said.<br><br>While some people managed to escape, displaced Palestinians sheltering at Al-Shifa, along with staff and patients remained trapped inside while under IOF fire, ‘fearing to leave or physically unable to do so’ (MSF). Ann Taylor, MSF’s Head of Mission in Palestine said: ‘The situation in Al-Shifa is truly catastrophic.’<br><br>The Director of Al-Shifa Hospital, Dr. Mohammed Abu Salmiya, said: ‘Surgeries have had to stop. Kidney dialysis has stopped and the neonatal unit is in a very dire situation.’'
    },
    sources: [
        {
            sourceName: 'United Nations Office for the Coordination of Humanitarian Affairs',
            sourceLink: 'https://www.ochaopt.org/content/hostilities-gaza-strip-and-israel-flash-update-37',
            archiveLink: 'https://archive.ph/KtXNY',
        }
    ]
},
 
{
    claimTitle: 'Israeli state offered fuel to Al-Shifa Hospital and it was refused by Hamas',
    date: '11 Nov 2023',
    claim: {
        claimText: 'Context',
        claimTag: 'context-tag'
    },
    description: {
        summary: 'Israeli snipers are firing at anyone near Al-Shifa Hospital',
        details: 'Doctors Without Borders (Médecins Sans Frontières) stated that Israeli troops were shooting at those trying to exit the hospital, which the Israeli state denied.'
    },
    sources: [
        {
            sourceName: 'Doctors Without Borders (Médecins Sans Frontières)',
            sourceLink: 'https://www.msf.org/gaza-patients-and-medical-staff-trapped-hospitals-under-fire',
            archiveLink: 'https://archive.is/mk8D5',
        }
    ]
},
 
{
    claimTitle: 'Israeli state offered fuel to Al-Shifa Hospital and it was refused by Hamas',
    date: '12 Nov 2023',
    claim: {
        claimText: 'Claim',
        claimTag: 'claim-tag'
    },
    description: {
        summary: 'Netanyahu claims 300 litres of fuel offered by the Israeli state was refused by Al-Shifa Hospital',
        details: 'In an interview with US media outlet NBC (Meet the Press), Israeli Prime Minister Benjamin Netanyahu claimed that the Director of Al-Shifa Hospital Dr. Mohammed Abu Salmiya rejected an offer for fuel from the Israeli state, without providing details. <br><br> Netanyahu referred to hospitals as ‘Hamas command posts’. ‘We just offered Shifa Hospital fuel, they refused it so they you know so the fuel to run the hospital. See what happens is they want, the Hamas that is hiding in the hospitals and uh placing itself there doesn‘t want the fuel for the hospitals they don’t give a hoot about the patients they don’t give a hoot about the civilians uh their spokesman said this they said Hamas is underground above ground the civilian population that‘s Israel’s and the UN’s responsibility they don’t care about the civilians they don’t care about the patients but they want to get fuel that they’ll take from the hospitals to their tunnels to their War Machine the electricity they need to fire the Rockets they fired 10,000 rockets as we speak in Israel against Israelo cities and they continue to fight from those underground bunkers so what we have to do is separate the two we’ll try to help those who need it in the hospitals but not help the Hamas War Machine.’'
    },
    sources: [
        {
            sourceName: 'NBC',
            sourceLink: 'https://www.youtube.com/watch?v=dRThvlOjkq0',
            videoPreviewLink: 'https://drive.google.com/file/d/1TztfQRqHhsoMVktifFGoy_nWmCaGtf-e/view?usp=sharing'
        }
    ]
},
 
{
    claimTitle: 'Israeli state offered fuel to Al-Shifa Hospital and it was refused by Hamas',
    date: '12 Nov 2023',
    claim: {
        claimText: 'Debunk',
        claimTag: 'debunk-tag'
    },
    description: {
        summary: 'Al-Shifa Hospital accepted fuel and asked for it to be delivered through the Red Cross, which the Israeli state refused',
        details: 'The Director of Al-Shifa Hospital in Gaza, Dr. Muhammad Abu Salmiya, said an Israeli military operative contacted him on the phone and offered to supply the hospital with 2000 litres of fuel, which the hospital accepted.<br><br> In an interview with Al Jazeera Arabic, Dr. Abu Salmiya said the quantity was accepted and that he requested the Israelis deliver the fuel through the Red Cross. However, Israeli forces rescinded the offer of 2000 litres and said it would instead offer 300 litres of fuel. The Israeli military rejected delivering fuel through the Red Cross or any other international humanitarian organisation, and said the fuel would have to be picked up at 2am from an area being hit with Israeli bombardments. ‘We are ready to take fuel from anybody through the International Red Cross.’ See the full transcript of Dr. Abu Salmiya’s interview with Al Jazeera here or in the sources provided.'
    },
    sources: [
        {
            sourceName: 'Al Jazeera',
            sourceLink: 'https://www.youtube.com/watch?v=a2cd4pgbdkM',
            archiveLink: 'https://archive.is/aj65S',
            videoPreviewLink: 'https://files.hasbaratracker.com/12Nov2023_AlShifa_Hospital_Director_Muhammed_Abu_Salmiya_Fuel_AlJazeera.mp4'
        }
    ]
},
 
{
    claimTitle: 'Israeli state offered fuel to Al-Shifa Hospital and it was refused by Hamas',
    date: '12 Nov 2023',
    claim: {
        claimText: 'Claim',
        claimTag: 'claim-tag'
    },
    description: {
        summary: 'Israeli military press release points to two audio clips and footage as evidence that the Health Ministry rejected fuel',
        details: '<b>(Note: The press release, dated 12 November, 2023, links to videos uploaded on 15 November, 2023.)</b><br><br>The Israel Occupation Forces press release stated: ‘The Israeli Defense Forces (IDF) provided 300 liters of fuel for urgent medical needs at Shifa Hospital. However, Hamas stopped the hospital from receiving the fuel.’',
    },
    sources: [
        {
            sourceName: 'Israel Occupation Forces',
            sourceLink: 'https://youtu.be/-P9euA1Le_g',
            videoPreviewLink: 'https://files.hasbaratracker.com/15Nov2023_Alleged_Audio_IOF_Fuel_AlShifa_Gaza_Health_Ministry.mp4'
        }
    ]
},
 
{
    claimTitle: 'Israeli state offered fuel to Al-Shifa Hospital and it was refused by Hamas',
    date: '12 Nov 2023',
    claim: {
        claimText: 'Claim',
        claimTag: 'claim-tag'
    },
    description: {
        summary: 'Israeli military posts short audio clip on X claiming Gaza health official says Health Ministry rejected fuel',
        details: 'The official Israeli forces account on X (formerly Twitter) posted a short nine-second audio clip purporting that it was a conversation between a Gaza health official and a liasion officer with the Israeli military.<br>The post reads: ‘The IDF provided 300 liters of fuel for urgent medical purposes to the Shifa Hospital, but there was a problem that prevented the fuel from getting to its destination. Why? Because the CEO of the Hamas Health Ministry, Yosef Abu Rish, forbade it. Watch for yourselves:’'
    },
    sources: [
        {
            sourceName: '@IDF on X',
            sourceLink: 'https://x.com/IDF/status/1723753240162865350?s=20',
            archiveLink: 'https://archive.ph/aMVX8',
            videoPreviewLink: 'https://files.hasbaratracker.com/15Nov2023_Alleged_Audio_IOF_Fuel_AlShifa_Gaza_Health_Ministry.mp4'
        },
 
        {
            sourceName: 'Israel Occupation Force',
            sourceLink: 'https://www.idf.il/en/mini-sites/hamas-israel-war-24/war-on-hamas-2023-resources/hamas-refuses-fuel-delivery-to-shifa-hospital/',
            archiveLink: 'https://archive.is/xihlp',
        },
 
        {
            sourceName: 'YouTube',
            sourceLink: 'https://www.youtube.com/watch?v=cg0CEhWhguI',
            videoPreviewLink: 'https://files.hasbaratracker.com/15Nov2023_IOF_Fuel_Delivery_Footage_Claim.mp4'
        }
    ]
},
 
{
    claimTitle: 'Israeli state offered fuel to Al-Shifa Hospital and it was refused by Hamas',
    date: '12 Nov 2023',
    claim: {
        claimText: 'Claim',
        claimTag: 'claim-tag'
    },
    description: {
        summary: 'Israeli Foreign Affairs X account posts audio clip and alleged footage of Israeli forces delivering fuel to Al-Shifa',
        details: 'The official Israeli Ministry of Foreign Affairs account on X (formerly Twitter) posted a short nine-second audio clip purporting that it was a conversation between a Gaza health official and a liaison officer with the Israeli military. They also shared alongside it in the single post a video, alleging it is footage of Israeli forces delivering fuel to Al-Shifa Hospital.<br><br>The post reads:<br> ‘Breaking: Hamas prevented the Shifa Hospital from receiving 300 liters of fuel from the IDF for urgent medical purposes.<br>📸 (left) A recorded conversation between an IDF officer and a senior official in the health ministry in Gaza who states that the Hamas Health Ministry prevented them from receiving the fuel.<br>📸 (right) Footage of IDF delivering fuel.’'
    },
    sources: [
        {
            sourceName: '@IsraelMFA on X',
            sourceLink: 'https://twitter.com/IsraelMFA/status/1723753602382970943',
            archiveLink: 'https://archive.ph/x6ogI',
        }
    ]
},
 
{
    claimTitle: 'Israeli state offered fuel to Al-Shifa Hospital and it was refused by Hamas',
    date: '12 Nov 2023',
    claim: {
        claimText: 'Claim',
        claimTag: 'claim-tag',
    },
    description: {
        summary: 'Israeli military spokesperson for Arab media says 300L of fuel offered that Hamas rejected',
        details: 'Avichay Adraee, Israeli military spokesperson for Arab media, claimed on X (formerly Twitter) that Hamas factions prevented the hospital from receiving 300 litres of fuel.<br><br>The post, written in Arabic and translated to English, stated:<br><br>"An IDF force provided Al-Shifa Hospital with 300 litres of diesel for urgent medical purposes, but Hamas prevents receiving the fuel! After bringing the diesel to the hospital, the IDF received testimonies about Hamas factions preventing the hospital from receiving fuel. God suffices me, and He is the best disposer of affairs for Hamas and its leaders!"',
    },
    sources: [
        {
            sourceName: 'Avichay Adraee on X',
            sourceLink: 'https://twitter.com/AvichayAdraee/status/1723756023062597671',
            archiveLink: 'https://archive.ph/u4Yw4',
        }
    ]
},
 
{
    claimTitle: 'Israeli state offered fuel to Al-Shifa Hospital and it was refused by Hamas',
    claim: {
        claimText: 'Context',
        claimTag: 'context-tag',
    },
    date: '13 Nov 2023',
    description: {
        summary: 'At least 10,000 litres of fuel is needed to run vital parts of the hospital',
        details: 'Dr. Munir Boursh from Gaza’s Health Ministry stated the amount of fuel offered was barely enough to power the generators inside Al-Shifa Hospital for half an hour.<br><br>‘We consume at least 500 litres per hour to run our generators, we need around 10,000 litres each day. Three hundred litres is nothing.’',
    },
    sources: [
        {
            sourceName: 'The Guardian',
            sourceLink: 'https://www.theguardian.com/world/2023/nov/13/in-the-circle-of-death-gaza-doctors-say-patients-are-under-siege-in-al-shifa',
            archiveLink: 'https://archive.ph/kOzB2',
        }
    ]
},
 
{
    claimTitle: 'Israeli state offered fuel to Al-Shifa Hospital and it was refused by Hamas',
    date: '13 Nov 2023',
    claim: {
        claimText: 'Debunk',
        claimTag: 'debunk-tag',
    },
    description: {
        summary: 'Hamas officials reject claim that they prevented fuel delivery',
        details: 'Hamas released a statement saying: ‘Hamas is not a party to the management of Al-Shifa Hospital, nor does it have a presence within its decision-making structure, and it is completely subject to the authority of the Palestinian Health Ministry, which manages its administrative and technical affairs.’ <br><br>They also added: ‘The offer belittles the pain and suffering of the patients who are trapped inside without water, food, or electricity. This quantity is not enough to operate hospital generators for more than 30 minutes.’ <br><br>Dr. Munir Boursh said the hospital was ready to accept an offer of 300 litres of diesel fuel from Israeli forces stationed outside, but that the hospital director Dr. Muhammed Abu Salmiya would only receive it from the International Committee of the Red Cross (ICRC), fearing the danger of moving around.<br><br>‘The hospital is not functioning as a hospital any more. We, the medical staff, are asking for a safe corridor to leave the hospital with the patients, guaranteed by the International Committee of the Red Cross.’',
    },
    sources: [
        {
            sourceName: 'Sky News',
            sourceLink: 'https://news.sky.com/story/israel-and-hamas-dispute-claims-of-gaza-hospital-fuel-offer-as-babies-among-12-dead-13006949',
            archiveLink: 'https://archive.ph/FivPS',
        },
 
        {
            sourceName: 'Al Bawaba',
            sourceLink: 'https://www.albawaba.com/news/hamas-denies-claims-refusing-receive-fuel-al-shifa-hospital-gaza-1541324',
            archiveLink: 'https://archive.is/7DUiu',
        },
 
        {
            sourceName: 'The Guardian',
            sourceLink: 'https://www.theguardian.com/world/2023/nov/13/in-the-circle-of-death-gaza-doctors-say-patients-are-under-siege-in-al-shifa',
            archiveLink: 'https://archive.ph/kOzB2',
        }
    ]
},
 
{
    claimTitle: 'Israeli state offered fuel to Al-Shifa Hospital and it was refused by Hamas',
    date: '15 Nov 2023',
    claim: {
        claimText: 'Claim',
        claimTag: 'claim-tag',
    },
    description: {
        summary: 'Audio clip of soldier allegedly giving instructions for fuel delivery',
        details: 'In a press release dated 12 November, 2023, with links to videos uploaded to YouTube on 15 November, 2023, Israel Occupation Forces (IOF) wrote: ‘The Israeli Defense Forces (IDF) provided 300 liters of fuel for urgent medical needs at Shifa Hospital. However, Hamas stopped the hospital from receiving the fuel."<br><br>They shared an unlisted video on YouTube of an IOF member in broken Arabic with a Hebrew accent allegedly giving directions to someone at Al-Shifa Hospital.<br><br>"We‘ll place the fuel at Al Majlis A-Tashri’i Junction. That is, the junction linking Omar al-Mukhtar and Nasr streets. Omar al-Mukhtar and Nasr, okay. [Redacted] will talk to you. After we place the gallons, he‘ll tell you they‘re there. Then, after we put the gallons, our forces will move back so that our forces won‘t be near the junction. (Then) you will send an ambulance, take the fuel.’',
    },
    // MISSING
    sources: [
        {
            sourceName: 'Israel Occupation Forces',
            sourceLink: '',
            archiveLink: '',
        }
    ]
},
 
{
    claimTitle: 'Israeli state offered fuel to Al-Shifa Hospital and it was refused by Hamas',
    date: '15 Nov 2023',
    claim: {
        claimText: 'Claim',
        claimTag: 'claim-tag',
    },
    description: {
        summary: 'Audio clip of soldier allegedly giving instructions for fuel delivery',
        details: 'In a press release dated 12 November, 2023, with links to videos uploaded to YouTube on 15 November, 2023, Israel Occupation Forces (IOF) wrote: ‘The Israeli Defense Forces (IDF) provided 300 liters of fuel for urgent medical needs at Shifa Hospital. However, Hamas stopped the hospital from receiving the fuel."<br><br>They shared an unlisted video on YouTube of an IOF member in broken Arabic with a Hebrew accent allegedly giving directions to someone at Al-Shifa Hospital.<br><br>"We‘ll place the fuel at Al Majlis A-Tashri‘i Junction. That is, the junction linking Omar al-Mukhtar and Nasr streets. Omar al-Mukhtar and Nasr, okay. [Redacted] will talk to you. After we place the gallons, he‘ll tell you they‘re there. Then, after we put the gallons, our forces will move back so that our forces won‘t be near the junction. (Then) you will send an ambulance, take the fuel.’',
    },
    sources: [
        {
            sourceName: 'Israel Occupation Forces',
            sourceLink: 'https://www.idf.il/en/mini-sites/hamas-israel-war-24/war-on-hamas-2023-resources/hamas-refuses-fuel-delivery-to-shifa-hospital/',
            archiveLink: 'https://archive.ph/xihlp',
            videoPreviewLink: 'https://files.hasbaratracker.com/15Nov2023_IOF_Claim_Audio_Fuel_Delivery.mp4'
        },
        {
            sourceName: 'YouTube',
            sourceLink: 'https://www.youtube.com/watch?v=zs-2vw5lfgQ',
            archiveLink: 'https://archive.ph/UCvws',
        }
    ]
},
 
{
    claimTitle: 'Israeli state offered fuel to Al-Shifa Hospital and it was refused by Hamas',
    date: '23 Nov 2023',
    claim: {
        claimText: 'Context',
        claimTag: 'context-tag',
    },
    description: {
        summary: 'Director of Al-Shifa Hospital and other senior healthworkers arrested and detained by Israeli forces',
        details: 'The Israeli military arrested Dr. Muhammad Abu Salmiya and other health professionals at Al-Shifa Hospital. Dr. Abu Salmiya was held for questioning following the Israeli state‘s assertion that there was "evidence showing that Shifa Hospital, under his direct management, served as a Hamas command and control centre."<br><br>The now-deleted IOF press release on the arrest was titled: "Following evidence the Shifa Hospital was used as a Hamas command and control centre under his management – the director of the Shifa Hospital was apprehended and transferred to ISA for questioning."',
    },
    sources: [
        {
        sourceName: 'Al Jazeera',
        sourceLink: 'https://www.aljazeera.com/news/2023/11/23/al-shifa-hospital-director-arrested-by-israeli-army-in-gaza',
        archiveLink: 'https://archive.is/Npk8h',
        videoPreviewLink: ''
        }
    ]
},
 
{
    claimTitle: 'Israeli state offered fuel to Al-Shifa Hospital and it was refused by Hamas',
    date: '5 Dec 2023',
    claim: {
        claimText: 'Context',
        claimTag: 'context-tag',
    },
    description: {
        summary: 'Director of Al-Shifa Hospital being held and interrogated by Shin Bet under Israeli ‘emergency war rules’',
        details: 'Dr. Muhammad Abu Salmiya is being criminally probed by the Shin Bet (Israel Security Agency) under ‘current war emergency regulations relating to Hamas’ according to Israeli state officials.',
    },
    sources: [
        {
            sourceName: 'Jerusalem Post',
            sourceLink: 'https://www.jpost.com/israel-news/article-776708',
            archiveLink: 'https://archive.is/qtBA3',
        }
    ]
},
 
// CLAIM: Makeup used in Gaza to fake injuries
 
{
   claimTitle: 'Makeup used in Gaza to fake injuries',
   date: '2005',
   claim: {
       claimText: 'Context',
       claimTag: 'context-tag',
   },
   description: {
       summary: 'The context of the term ‘Pallywood’: Atrocity denial that suggests media showing Palestinian suffering is fabricated',
           details: 'Pallywood is a term which combines the words ‘Palestine’ and ‘Hollywood’ to suggest that Palestinians produce fabricated or manipulated media content to gain sympathy for the cause and to influence public opinion of the Israeli occupation. It is used to dismiss the reality of Palestinians by claiming there is a deliberate effort to stage events, create misleading narratives, or exaggerate circumstances in order to portray the Israeli military occupation as the aggressors. It is a form of atrocity denial, used as a form of exonerating the Israeli state.<br><br>The term started being used following the killing of 12-year-old Palestinian boy Muhammad al-Durrah in Gaza by Israeli forces during the Second Intifada in 2000. The Israeli state and its pundits launched a denial campaign, questioning the authenticty of the photographic and video evidence by France24. The Israeli state initially admitted that it had killed Muhammad al-Durrah, then retracted it.<br><br> American author Richard Landes, who specialises in medieval millenial thinking, credits himself with coining the term and popularising it through his online documentary titled ‘Pallywood: According to Palestinian Sources’ published in 2005.',
   },
   sources: [
       {
           sourceName: '<em>Friends of Israel: The Backlash Against Palestine Solidarity</em> by Hil Aked, 2023',
           sourceLink: 'https://www.google.co.uk/books/edition/Friends_of_Israel/cKCvEAAAQBAJ?hl=en&gbpv=1&dq=pallywood%20denial&pg=PR265&printsec=frontcover',
           archiveLink: 'https://files.hasbaratracker.com/2023_friendsofisrael_hil_aked_pallywood.png',
       },
   ]
},
{
   claimTitle: 'Makeup used in Gaza to fake injuries',
   date: '29 Oct 2023',
   claim: {
       claimText: 'Context',
       claimTag: 'context-tag',
   },
   description: {
       summary: 'Child actor Rami Jardali shared behind-the-scenes of short film The Reality',
       details: 'Rami Jardali, a child actor in the short film <em>The Reality</em> shot in Lebanon, shared a reel on Instagram including behind-the-scenes footage from the production of film. <em>The Reality</em> is a Lebanese short film directed by Mahmoud Ramzi. <br><br> The clip begins with a child who appears to be wounded being treated on a stretcher as protesters wave Palestinian flags. As the video goes on, however, a makeup artist can be seen applying makeup to the girl to depict blood and wounds, and the child smiles at the camera.',
   },
   sources: [
       {
           sourceName: 'Instagram',
           sourceLink: 'https://www.instagram.com/p/Cy_Y4Qeqq9L',
           videoPreviewLink: 'https://files.hasbaratracker.com/28Oct2023_TheReality_Film_BehindTheScenes.mp4',
       },
   ]
},
{
   claimTitle: 'Makeup used in Gaza to fake injuries',
   date: '8 Nov 2023',
   claim: {
       claimText: 'Claim',
       claimTag: 'claim-tag',
   },
   description: {
       summary: 'Israeli model Nataly Dadon shared the behind-the-scenes video suggesting Palestinians in Gaza were crisis actors, faking injuries',
       details: 'Israeli model Nataly Dadon shared the video to 900k+ followers on her Instagram profile suggesting Palestinians were faking injuries and are crisis actors for propaganda purposes.<br><br>Her caption read:<br><br>‘And the Oscar goes to…’<br><br>#gazawood<br><br>Wait for it…’',
   },
   sources: [
       {
           sourceName: 'Instagram',
           sourceLink: 'https://www.instagram.com/reel/CzZnwg0Nj0K/',
           archiveLink: 'https://archive.ph/0RE8O',
       },
   ]
},

{
   claimTitle: 'Makeup used in Gaza to fake injuries',
   date: '8 Nov 2023',
   claim: {
       claimText: 'Debunk',
       claimTag: 'debunk-tag',
   },
   description: {
       summary: 'The clip is from the set of short film The Reality',
       details: 'People online quickly pointed out that the clip is from the behind-the-scenes of the filming of Lebanese short film ‘The Reality’ directed by Mahmoud Ramzi. The post shows the making of the film and the process behind the scenes, which explores the reality of Palestinians in Gaza.<br><br>The clip opens with a child who appears to be wounded being treated on a stretcher as protesters wave Palestinian flags. As the video goes on, a makeup artist can be seen applying makeup to the girl to depict blood and wounds, and the child smiles at the camera.',
   },
   sources: [
       {
           sourceName: 'Instagram',
           sourceLink: 'https://www.instagram.com/p/Cy_Y4Qeqq9L/',
           archiveLink: 'https://archive.is/R3UQv',
           videoPreviewLink: 'https://files.hasbaratracker.com/28Oct2023_TheReality_Film_BehindTheScenes.mp4',
       },
   ]
},

{
   claimTitle: 'Makeup used in Gaza to fake injuries',
   date: '9 Nov 2023',
   claim: {
       claimText: 'Claim',
       claimTag: 'claim-tag',
   },
   description: {
       summary: 'Israeli spokesperson to Arab media Ofir Gendelman posted the video: ‘Pallywood gets busted again’',
       details: 'Ofir Gendelman, the Israeli Prime Minister‘s spokesperson to Arab media, shared the behind-the-scenes footage of the Lebanese short film on X (formerly Twitter), claiming it showed Palestinians faking injuries and staging evacuations.<br><br>The post read: ‘The Palestinians are fooling the international media and public opinion. DON’T FALL FOR IT. See for yourselves how they fake injuries and evacuating "injured" civilians, all in front of thr cameras. Pallywood gets busted again.’<br><br>As of 10 November, 2023, the video on Gendelman‘s profile had 22.6 million views. It has since been deleted – date unknown.',
   },
   sources: [
       {
           sourceName: 'Ofir Gendelman on X',
           sourceLink: 'https://twitter.com/ofirgendelman/status/1722561334858961025',
           archiveLink: 'https://archive.is/7FIef',
           hasBeenDeleted: 'true',
       },
   ]
},

{
   claimTitle: 'Makeup used in Gaza to fake injuries',
   date: '9 Nov 2023',
   claim: {
       claimText: 'Debunk',
       claimTag: 'debunk-tag',
   },
   description: {
       summary: 'Israeli spokesperson Ofir Gendelman backtracks, claiming ‘Palestinian accounts’ shared the video ‘as if it was genuine’',
       details: 'Ofir Gendelman re-quoted his initial post on X (formerly Twitter), writing: ‘Palestinian accounts have published this video as if it was genuine. That‘s why it was posted here.’',
   },
   sources: [
       {
           sourceName: 'Ofir Gendelman on X',
           sourceLink: 'https://twitter.com/ofirgendelman/status/1722683651681329468',
           archiveLink: 'https://archive.ph/luRmL',
       },
   ]
},

{
   claimTitle: 'Makeup used in Gaza to fake injuries',
   date: '9 Nov 2023',
   claim: {
       claimText: 'Claim',
       claimTag: 'claim-tag',
   },
   description: {
       summary: 'Israeli pundit Hen Mazzig posted the video claiming it was proof of Palestinians faking injuries',
       details: 'Hen Mazzig, an Israeli pundit who is a fellow at the Tel Aviv Institute – a lobbyist organisation – shared the behind-the-scenes footage on X (formerly Twitter) claiming it was proof of Palestinians faking injuries and that it was common practice.<br><br>The post read: ‘I was asked about the photos and videos of injured Palestinian children. It’s important to remember innocent Palestinians are hurt in this conflict (yes, far less than the 10k Hamas claims), yet this is an example of a popular practice in Gaza:’<br><br>The post has since been deleted.',
   },
   sources: [
       {
           sourceName: 'Hen Mazzig on X',
           sourceLink: 'https://twitter.com/HenMazzig/status/1722572056078791010',
           archiveLink: 'https://archive.is/TYE1q',
           hasBeenDeleted: 'true',
       },
   ]
},

{
   claimTitle: 'Makeup used in Gaza to fake injuries',
   date: '9 Nov 2023',
   claim: {
       claimText: 'Debunk',
       claimTag: 'debunk-tag',
   },
   description: {
       summary: 'Fact-checking website Snopes spoke to The Reality‘s director who said the disinformation is used to cover up Israeli crimes',
       details: 'Fact-checking website Snopes.com reached out to Mahmoud Ramzi via Instagram where he explained that he is a Palestinian director born in Lebanon and confirmed he had directed the viral video. ‘I directed a short film that tells about the events related to the Palestine issue around the world and the death bed that we see daily in Gaza.’',
   },
   sources: [
       {
           sourceName: 'Snopes.com',
           sourceLink: 'https://www.snopes.com/fact-check/film-crew-footage-gaza/',
           archiveLink: 'https://archive.ph/mtWjz',
       },
  ]
},
 
{
   claimTitle: 'Makeup used in Gaza to fake injuries',
   date: '10 Nov 2023',
   claim: {
       claimText: 'Debunk',
       claimTag: 'debunk-tag',
   },
   description: {
       summary: 'The Reality‘s director Mahmoud Ramzi debunks Israeli claims, says film shows re-enactment of Palestinian reality',
       details: 'Mahmoud Ramzi, the director of the film The Reality, shared a story on Instagram explaining the context of the video with text reading: ‘Re-enacting the scenes of the most horrific crimes committed by the enemy against our people. Based on a true story. Our solidarity with our people in Palestine, salam from Lebanon.’',
   },
   sources: [
       {
           sourceName: 'Instagram',
           sourceLink: 'https://www.snopes.com/fact-check/film-crew-footage-gaza/',
           archiveLink: 'https://files.hasbaratracker.com/10Nov2023_Mahmoud_Ramzi_Instagram.tiff',
       },
  ]
},

{
   claimTitle: 'Makeup used in Gaza to fake injuries',
   date: '10 Nov 2023',
   claim: {
       claimText: 'Claim',
       claimTag: 'claim-tag',
   },
   description: {
       summary: 'The Israeli state‘s Consul General to Midwest India shared the video claiming Bollywood has competition with Palestinians',
       details: 'Kobbi Shoshani, the Israeli state‘s Consul General to Midwest India, shared the video on X (formerly Twitter) with the caption: ‘Bollywood, you have fake competition in Gaza.’',
   },
   sources: [
       {
           sourceName: 'X (formerly Twitter)',
           sourceLink: 'https://twitter.com/KobbiShoshani/status/1722801997206999141?s=20',
           archiveLink: 'https://archive.is/JZ82W',
       },
  ]
},

{
   claimTitle: 'Makeup used in Gaza to fake injuries',
   date: '10 Nov 2023',
   claim: {
       claimText: 'Debunk',
       claimTag: 'debunk-tag',
   },
   description: {
       summary: 'Film being ‘twisted to accuse Palestinians of faking injuries’: AP News',
       details: 'US media outlet AP News verified that the claim is false. AP News confirmed with director Mahmoud Ramzi the short film was shot in Lebanon and was filmed to show the ‘pain that Gaza’s people endured.’',
   },
   sources: [
       {
           sourceName: 'AP News',
           sourceLink: 'https://apnews.com/article/fact-check-crisis-actor-israel-hamas-war-false-movie-set-975355588351',
           archiveLink: 'https://archive.is/hXdZk',
       },
  ]
},

{
   claimTitle: 'Makeup used in Gaza to fake injuries',
   date: '14 Nov 2023',
   claim: {
       claimText: 'Debunk',
       claimTag: 'debunk-tag',
   },
   description: {
       summary: 'Video used to ‘falsely claim Palestinians faked injuries’: USA Today',
       details: 'US media outlet USA Today reported a fact checking article debunking the claim that Palestinians in Gaza, bombarded and attacked by the Israeli state, are faking injuries.',
   },
   sources: [
       {
           sourceName: 'USA Today',
           sourceLink: 'https://www.usatoday.com/story/news/factcheck/2023/11/14/video-not-proof-of-fake-palestinian-injuries-fact-check/71568997007/',
           archiveLink: 'https://archive.is/JYApD',
       },
    ]
},
 
// CLAIM: Israeli state denies killing mother and daughter seeking refuge in Gaza’s Holy Family Parish
{
   claimTitle: 'Israeli state denies killing mother and daughter seeking refuge in Gaza’s Holy Family Parish',
   date: '16 Dec 2023',
   claim: {
       claimText: 'Context',
       claimTag: 'context-tag',
   },
   description: {
       summary: 'Israeli tanks fired on Holy Family Church‘s Convent in Gaza',
           details: 'On the morning of 16 December, 2023, Israeli forces fired a rocket at the Convent of Sisters of Mother Theresa (Missionaries of Charity) which sits in the Holy Family Parish compound. <br><br>The Holy Family Parish is a Catholic church in Gaza. <br><br> The rocket caused an explosion and fire, which destroyed the building‘s generator and fuel resources – its only source of electricity. Israeli forces fired two more rockets from a tank, displacing the 54 disabled people there and leaving them without access to respirators that some of them need to survive, the statement said. <br><br>Water tanks and solar panels were also destroyed.',
   },
   sources: [
       {
           sourceName: 'The Latin Patriarch of Jerusalem',
           sourceLink: 'https://twitter.com/LPJerusalem/status/1736057252086268025',
           archiveLink: 'https://archive.ph/u4lkL',
           videoPreviewLink: 'https://files.hasbaratracker.com/16Dec_attack__Holy_Family_Parish_compound.webp',
       },
   ]
},

{
   claimTitle: 'Israeli state denies killing mother and daughter seeking refuge in Gaza’s Holy Family Parish',
   date: '16 Dec 2023',
   claim: {
       claimText: 'Context',
       claimTag: 'context-tag',
   },
   description: {
       summary: 'Palestinian mother and daughter seeking refuge in church killed by Israeli snipers',
           details: 'Mother and daughter Nahida and Samar Anton were seeking refuge in the Holy Family Church in Gaza. They are Palestinian Christians.  <br><br>Nahida, also known as Um Emad (mother of Emad) and her daughter Samar left the church to walk over to the Sisters’ Convent to use the bathroom. <br><br>‘A sniper bullet cracked through the air and into Samar’s head. Another hit Nahida, a grandmother of 15, in the stomach.’ <br><br> Family members witnessed the murders. A relative of Nahida and Samar spoke to UK news outlet The Independent, stating: ‘Some of our relatives rushed out to help. One of them was a surgeon called Dr Elias, the others were my family members including a cousin, who is just 16 years old. But they were then hit by a kind of bomb. <br><br> Seven in total were injured from shrapnel – including my teenage cousins. There is no way to properly treat them there are no working hospitals in north Gaza.’',
   },
   sources: [
       {
           sourceName: 'The Independent',
           sourceLink: 'https://www.independent.co.uk/news/world/middle-east/israel-gaza-church-palestinians-christians-b2466049.html',
           archiveLink: 'https://archive.is/C1lE9',
       },

        {
            sourceName: 'LPJerusalem on X',
            sourceLink: 'https://twitter.com/LPJerusalem/status/1736057252086268025',
            archiveLink: 'https://archive.ph/u4lkL',
        },
    ]
},

{
   claimTitle: 'Israeli state denies killing mother and daughter seeking refuge in Gaza’s Holy Family Parish',
   date: '16 Dec 2023',
   claim: {
       claimText: 'Debunk',
       claimTag: 'debunk-tag',
   },
   description: {
       summary: 'Latin Patriarch of Jerusalem confirms Israeli sniper murdered two women inside Holy Family Parish',
           details: 'Patriarchate Cardinal Pizzaballa of the Latin Patriarch of Jerusalem issued a statement confirming the murder of mother and daughter Nahida and Samar Anton by Israeli forces. <br><br> The statement read: <br><br> ‘Around noon today, December 16, 2023, a sniper of the IDF murdered two Christian women inside the Holy Family Parish in Gaza, where the majority of Christian families has taken refuge since the start of the war. Nahida and her daughter Samar were shot and killed as they walked to the Sister’s Convent. One was killed as she tried to carry the other to safety.’<br><br> The statement said another seven people were ‘shot and wounded’ while trying to ‘protect others inside the church compound’.<br><br>‘No warning was given, no notification was provided,’ the Patriarchate said. ‘They were shot in cold blood inside the premises of the Parish, where there are no belligerents.’',
   },
   sources: [
       {
           sourceName: 'The Latin Patriarch of Jerusalem',
           sourceLink: 'https://www.lpj.org/en/gaza-16th-december-2023',
           archiveLink: 'https://archive.ph/ByVDW',
       },
    ]
},

{
   claimTitle: 'Israeli state denies killing mother and daughter seeking refuge in Gaza’s Holy Family Parish',
   date: '16 Dec 2023',
   claim: {
       claimText: 'Debunk',
       claimTag: 'debunk-tag',
   },
   description: {
       summary: 'Catholic Bishops’ president condemns murder by Israeli forces',
           details: 'Cardinal Vincent Nichols, President of the Catholic Bishops’ Conference of England and Wales, issued a statement describing the murder of Nahida and Samar, who were taking refuge in the Holy Family Parish in Gaza, as callous.<br><br> The statement by Cardinal Nichols read:<br><br>‘I am heartbroken at the information provided by Cardinal Pizzaballa, the Latin Patriarch of Jerusalem, of killings in the Church compound of the Catholic Parish of the Holy Family in Gaza City. I have immediately sent a message to His Eminence, expressing my horror at these events and assuring him of the prayers of Catholics in England and Wales.’<br><br>He added: ‘The information provided by the Cardinal gives a picture of seemingly deliberate and callous killing by IDF soldiers of innocent civilians: an elderly woman and her daughter in the grounds of a church. This killing has to stop. It can never be justified.’',
   },
   sources: [
       {
           sourceName: 'Friends of the Holy Land',
           sourceLink: 'https://www.friendsoftheholyland.org.uk/blog/cardinal-vincent-nichols-statement-on-holy-family-parish-in-gaza',
           archiveLink: 'https://archive.ph/8jBdR',
       },
    ]
},

{
   claimTitle: 'Israeli state denies killing mother and daughter seeking refuge in Gaza’s Holy Family Parish',
   date: '16 Dec 2023',
   claim: {
       claimText: 'Claim',
       claimTag: 'claim-tag',
   },
   description: {
       summary: 'Israeli ambassador says Israeli forces ‘misidentified’ the women, accuses Latin Patriarch of ‘blood libel’',
           details: 'Raphael Schutz, the Israeli ambassador to the Holy See (the Holy See refers to the jurisdiction of the Pope in his role as the Bishop of Rome), shared multiple posts on X (formerly Twitter) claiming that Israeli forces ‘apparently misidentified two Catholic women... as terrorists’.<br><br> He called the press release from the Latin Patriarch of Jerusalem describing the attack as cold-blooded murder as ‘blood libel’. <br><br>The statement, separated as three posts, reads:<br><br> 1. ‘War is terrible and chaotic. Yesterday Israeli forces mistakenly killed three Israeli hostages and today an Israeli sniper apparently misidentified two Catholic women, mother and daughter, as terrorists and killed them. Under such circumstances, describing the tragic event as a’<br><br>2. ‘Under such circumstances, when there is no shred of proof that the event was anything but a terrible mistake, describing it as "a cold blooded murder" as in the text released today by the communication office of the Latin Patriarchate of Jerusalem,’<br><br>3. ‘is to be condemned in the harshest terms as a blood libel. This kind of fallacies must be rejected by every decent human being.’<br><br>In the third post, the press release by the Latin Patriarch of Jerusalem was shared.',
   },
   sources: [
       {
           sourceName: 'Raphael Schutz on X',
           sourceLink: 'https://twitter.com/RafiSchutz/status/1736103162359005412',
           archiveLink: 'https://archive.ph/rZCXm',
       },
    ]
},
{
   claimTitle: 'Israeli state denies killing mother and daughter seeking refuge in Gaza’s Holy Family Parish',
   date: '17 Dec 2023',
   claim: {
       claimText: 'Debunk',
       claimTag: 'debunk-tag',
   },
   description: {
       summary: 'Pope Francis condemns the Israeli attack, calling it terrorism',
           details: 'Head of the Catholic Church Pope Francis delivered a speech following his Sunday Angelus prayer at The Vatican condemning the killing of Nahida and Samar.<br><br>‘I continue to receive very serious and painful news from Gaza. Unarmed civilians are subjected to bombings and shootings.’<br><br>‘And this even happened inside the parish complex of the Holy Family, where there are no terrorists, but families, children, sick and disabled people, nuns.’<br><br>‘Yes, it’s war, it’s terrorism,’ the Pope said.',
   },
   sources: [
       {
           sourceName: 'Vatican News on X',
           sourceLink: 'https://twitter.com/VaticanNews/status/1736400607240659092',
           archiveLink: 'https://archive.ph/hIYfl',
       },
        {
            sourceName: 'Vatican News on YouTube',
            sourceLink: 'https://www.youtube.com/watch?v=AXHte30VVqE',
            videoPreviewLink: 'https://files.hasbaratracker.com/17Dec_Pope_condemns_IOF_church_attack_Gaza.mp4',
        },
   ]
},

{
   claimTitle: 'Israeli state denies killing mother and daughter seeking refuge in Gaza’s Holy Family Parish',
   date: '18 Dec 2023 ',
   claim: {
       claimText: 'Claim',
       claimTag: 'claim-tag',
   },
   description: {
       summary: 'Israeli forces deny attacking the Holy Family Parish',
           details: 'Israeli forces denied attacking the Holy Family Church, stating that were ‘no reports of a hit on the church, nor civilians being injured or killed, were raised’.<br><br> In a statement to Agence France-Presse, Israeli forces claimed it ‘does not target civilians, no matter their religion’. They also said a review they carried out of its own ‘operational findings’ supported this.',
   },
   sources: [
       {
           sourceName: 'The Times of Israel',
           sourceLink: 'https://www.timesofisrael.com/idf-refutes-claim-it-targeted-sole-catholic-church-in-gaza-after-2-women-said-killed/',
           archiveLink: 'https://archive.is/VSxx4',
       },
   ]
},

{
   claimTitle: 'Israeli state denies killing mother and daughter seeking refuge in Gaza’s Holy Family Parish',
   date: '18 Dec 2023',
   claim: {
       claimText: 'Claim',
       claimTag: 'claim-tag',
   },
   description: {
       summary: 'Israeli Prime Minister’s senior adviser blames Hamas for the Holy Family Parish attacks',
           details: 'In an interview with UK news outlet Sky News, Mark Regev – senior adviser to Israeli Prime Minister Benjamin Netanyahu – denied Israel Occupation Forces were behind the murders, claiming it was not something Israeli forces did, and blamed Palestinian resistance fighters with Hamas.<br><br>In the interview, which featured Cardinal Vincent Nichols, Regev said he rejected the Cardinal’s description of it as a cold-blooded killing.<br><br>‘I would reject the categorisation of the words he used: ‘coldblooded killing.’ That would indicate a deliberate targeting of civilians; that’s something we don’t do.’<br><br>‘We don’t shoot people who are going to church to pray; that just doesn’t happen. That’s not the way the IDF operates.’<br><br>‘To say that Israel is deliberately targeting Christian worshippers, that’s a terrible accusation that is unfounded.’<br><br>Could they have been killed by Palestinian terrorists who were shooting at people indiscriminately? I don’t know,’ he said.',
   },
   sources: [
       {
           sourceName: 'Sky News UK',
           sourceLink: 'https://twitter.com/SkyNews/status/1736681550564020520',
           archiveLink: 'https://archive.ph/etLzV',
           videoPreviewLink: 'https://files.hasbaratracker.com/18Dec2023_Mark_Regev_church_attack_denial.mp4',
       },
   ]
},

{
   claimTitle: 'Israeli state denies killing mother and daughter seeking refuge in Gaza’s Holy Family Parish',
   date: '18 Dec 2023',
   claim: {
       claimText: 'Debunk',
       claimTag: 'debunk-tag',
   },
   description: {
       summary: 'Church attacks are ‘cold-blooded killing’, says British Cardinal',
           details: 'In an interview with the UK news outlet Sky News, Cardinal Vincent Nichols – President of the Catholic Bishops’ Conference of England and Wales – said he did not believe the denial from the Israeli state, saying it ‘hard to believe’.<br><br>‘The people in Gaza and the Cardinal Archbishop of Jerusalem, they’re not given to tell lies,’ Cardinal Nichols said.',
   },
   sources: [
       {
           sourceName: 'Sky News UK',
           sourceLink: 'https://twitter.com/SkyNews/status/1736681550564020520',
           archiveLink: 'https://archive.ph/etLzV',
       },
   ]
},

{
   claimTitle: 'Israeli state denies killing mother and daughter seeking refuge in Gaza’s Holy Family Parish',
   date: '21 Dec 2023',
   claim: {
       claimText: 'Claim',
       claimTag: 'claim-tag',
   },
   description: {
        summary: 'Israeli forces say their review showed they were firing at ‘Hamas spotters’, still deny killing mother and daughter',
           details: 'Israeli forces denied killing Nahida and Samar Anton, claiming that Palestinian resistance fighters fired an RPG from the vicinity of the church and that Israeli forces hit back at people they claim were ‘spotting’ for Hamas. They claimed to they were continuing an ‘examination of the incident’.<br><br>The Israel Occupation Forces (IOF)’s statement to the Catholic News Agency:<br><br>‘Following the reports of two women that were shot in the area of the Latin Church in Shejaya, the IDF has finished conducting an initial review of the incident. The review found that on December 17th, in the early afternoon, Hamas terrorists launched a Rocket Propelled Grenade (RPG) at IDF troops from the vicinity of the church. The troops then identified three people in the vicinity, operating as spotters for Hamas by guiding their attacks in the direction of the IDF troops. In response, our troops fired towards the spotters and hits were identified.’<br><br>‘While this incident occurred in the area where the two women were reportedly killed, the reports received do not match the conclusion of our initial review which found that the IDF troops were targeting spotters in enemy lookouts. We are continuing our examination of the incident.’<br><br>‘The IDF takes claims of strikes on sensitive sites very seriously, especially churches that are the holy sites for the Christian faith. The IDF directs its operations against the Hamas terrorist organization and not against civilians, regardless of their religious affiliation.’<br><br> ‘The IDF takes many measures to mitigate harm to civilians in the Gaza Strip. These efforts stand in contrast to Hamas that does everything in its power to endanger civilians and exploits them, as well as religious sites, as human shields for their terrorist activities.’',
   },
   sources: [
       {
           sourceName: 'Catholic News Agency',
           sourceLink: 'https://www.catholicnewsagency.com/news/256335/after-military-review-idf-again-denies-killing-two-women-at-gaza-catholic-church',
           archiveLink: 'https://archive.is/g191i',
       },
       {
           sourceName: 'Times of Israel',
           sourceLink: 'https://www.timesofisrael.com/idf-again-denies-killing-mother-and-daughter-at-gaza-church-cites-hamas-fire-in-area/',
           archiveLink: 'https://archive.ph/dcDcM',
       },
   ]
},

// CLAIM: Hamas were carrying instructions on how to make chemical weapons
{
   claimTitle: 'Hamas were carrying instructions on how to make chemical weapons',
   date: '1948',
   claim: {
       claimText: 'Context',
       claimTag: 'context-tag',
   },
   description: {
       summary: 'The Israeli state’s use of chemical weapons: How the chemical weapons’ research wing of the Israeli forces came to be',
           details: 'The Israeli settler-colony’s first prime minister David Ben-Gurion wrote to Ehud Avriel, an operative for the Jewish Agency in Europe, instructing him to search and recruit Jewish scientists who could ‘either increase the capacity to kill masses or to cure masses’.<br><br>Following Ben-Gurion’s instructions, Jewish scientists were recruited and formed the chemical weapons research wing of the occupation forces, known as ‘HEMED’.  Within it was a unit named ‘HEMED BEIT’ devoted to developing biological weapons.<br><br><strong> Further context:</strong><br><br><li class="dotpoint">Ehud Avriel was one of the key figures behind the Haganah militia’s arms purchasing unit, Rekhesh.</li><br><li class="dotpoint">HEMED later became the Israel Institute for Biological Research.</li><br><li class="dotpoint">The Israeli state has neither signed nor ratified the 1972 Biological Weapons Convention which prohibits the development, production, acquisition, transfer, stockpiling and use of biological and toxin weapons.</li><br><li class="dotpoint">On 1 April, 1948, Ben-Gurion wrote in his journal about ‘the development of science and speeding up its application in warfare.’</li><br><li class="dotpoint">Later in May 1948, Ben-Gurion wrote about ‘biological materials’ that were purchased for $2,000.</li><br>',
   },
   sources: [
       {
           sourceName: '<em>Israel and chemical/biological weapons: History, deterrence, and arms control</em> by Avner Cohen, 2001',
           sourceLink: 'https://files.hasbaratracker.com/2001_Avner_Cohen_Israel_and_chemical_biological_weapons.pdf',
           archiveLink: 'https://files.hasbaratracker.com/2001_Avner_Cohen_Israel_and_chemical_biological_weapons.pdf',
       },
   ]
},

{
   claimTitle: 'Hamas were carrying instructions on how to make chemical weapons',
   date: '1948',
   claim: {
       claimText: 'Context',
       claimTag: 'context-tag',
   },
   description: {
       summary: 'The Israeli state’s use of chemical weapons: Jewish militias poisoned Palestinian water sources during the Nakba in 1948',
           details: 'During the Nakba – the ethnic cleansing and mass displacement of Palestinians in 1948 – Jewish forces poisoned water supplies causing outbreaks of disease among Palestinians in an operation named Cast Thy Bread.<br><br> Israeli military historian Uri Milstein said Jewish militias – which would later form the Israel Occupation Forces – poisoned water supplies in many Palestinian villages ‘to prevent the inhabitants from coming back’.<br><br> One of the largest operations of this water poisoning campaign is believed to have taken place in Akka shortly before it was taken by Jewish militias on 17 May, 1948.<br><br>According to Milstein, Jewish forces contaminated water supplies leading to a typhoid epidemic. Milstein interviewed and named Yaacov Pundaq, a Haganah commander in the Carmeli Brigade’s 21st Battalion, who was involved in the operation.',
   },
   sources: [
       {
           sourceName: '<em>Cast thy bread: Israeli biological warfare during the 1948 War</em> by Benny Morris and Benjamin Z. Kedar, 2022',
           sourceLink: 'https://www.tandfonline.com/doi/abs/10.1080/00263206.2022.2122448',
           archiveLink: 'https://archive.ph/86Deo',
       },
       {
           sourceName: '<em>Israel and chemical/biological weapons: History, deterrence, and arms control</em> by Avner Cohen, 2001',
           sourceLink: 'https://files.hasbaratracker.com/2001_Avner_Cohen_Israel_and_chemical_biological_weapons.pdf',
           archiveLink: 'https://files.hasbaratracker.com/2001_Avner_Cohen_Israel_and_chemical_biological_weapons.pdf',
       },
       {
           sourceName: 'Ha’aretz',
           sourceLink: 'https://www.haaretz.com/israel-news/2022-10-14/ty-article-magazine/.highlight/documents-confirm-israelis-poisoned-arab-wells-in-1948/00000183-d2b2-d8cc-afc7-fefed64d0000',
           archiveLink: 'https://archive.is/2t2XH',
       },
   ]
},

{
   claimTitle: 'Hamas were carrying instructions on how to make chemical weapons',
   date: '1993',
   claim: {
       claimText: 'Context',
       claimTag: 'context-tag',
   },
   description: {
       summary: 'The Chemical Weapons Convention under International Humanitarian Law',
           details: 'The Chemical Weapons Convention prohibits the manufacture, stockpiling and use of chemical weapons.',
   },
   sources: [
       {
           sourceName: 'International Humanitarian Law Databases – ICRC',
           sourceLink: 'https://ihl-databases.icrc.org/en/ihl-treaties/cwc-1993#:~:text=The%20Chemical%20Weapons%20Convention%20(CWC,facilities%20and%20the%20weapons%20themselves.',
           archiveLink: 'https://archive.ph/86Deo',
       },
   ]
},

{
   claimTitle: 'Hamas were carrying instructions on how to make chemical weapons',
   date: '25 Sep 1997',
   claim: {
       claimText: 'Context',
       claimTag: 'context-tag',
   },
   description: {
       summary: 'The Israeli state’s use of chemical weapons: Poisoning Khaled Mashaal with fentanyl',
           details: 'In 1997, two Israeli Mossad agents posing as a couple on vacation attempted to poison Khaled Mashaal – then chairman of Hamas’ political bureau – in Amman, Jordan, with a fatal dose of the synthetic opiate fentanyl.<br><br>The Israeli state was pressured to give the antidote to reverse its effects by the Clinton administration. <br><br>The weapon was allegedly manufactored at the Israel Institute for Biological Research.',
   },
   sources: [
       {
           sourceName: 'Time',
           sourceLink: 'https://time.com/khaled-mashaal/',
           archiveLink: 'https://archive.md/jkSc7',
       },
   ]
},


{
   claimTitle: 'Hamas were carrying instructions on how to make chemical weapons',
   date: '15 Feb 2001',
   claim: {
       claimText: 'Context',
       claimTag: 'context-tag',
   },
   description: {
       summary: 'The Israeli state’s use of chemical weapons: Using poison gas against Palestinian protestors',
           details: 'During the Second Intifada, the Israeli state used ‘novel gas’ weapons against Palestinians in Gaza and the West Bank. American filmmaker James Longley was there at the time, and documented attacks and Palestinian testimonies in his documentary <em>Gaza Strip</em> (2002).<br><br>In one particular incident on 12 February, 2001, Israeli forces attacked protestors in Khan Younis that was unlike the tear gas Israeli forces usually deployed. It was reported at the time that 80 Palestinians attacked were hospitalised and were experiencing violent convulsions.<br><br>One Palestinian man in Nasser Hospital at the time said: ‘We were sitting in our house. There was shooting. We fled our homes. The house where we were was hit. We saw a fire, and we tried to put it out. First we saw white smoke, then yellow smoke and other colours. There was the smell of mint. When you breathe it in you don’t feel pain. It feels good. After 45 minutes you start feeling like you can’t breathe.’<br><br>News outlet Voice of Ramallah in Palestine reported at the time that specialists believed Israeli forces used an internationally banned nerve gas.<br><br>Dr Muhammad Abdallah Abd-al-Mun’im, official in charge of medical teams who treated the injured, said that the gas bombs fired last night on the western camp of Khan Yunis gave off heavy yellowish and highly-concentrated smoke. Those who inhaled it, he said, suffered a nervous breakdown and vomited blood.’',
   },
   sources: [
       {
           sourceName: 'CNN',
           sourceLink: 'https://edition.cnn.com/2001/WORLD/meast/02/15/arafat.gas/index.html',
           archiveLink: 'https://archive.md/lSEor',
       },
       {
           sourceName: 'Selected interview transcripts from <em>Gaza Strip (2002)</em> by James Longley',
           sourceLink: 'https://files.hasbaratracker.com/12Feb_2001_selected_transcripts_use_of_gas_iof.pdf',
           archiveLink: 'https://files.hasbaratracker.com/12Feb_2001_selected_transcripts_use_of_gas_iof.pdf',
       },
       {
           sourceName: 'Voice of Palestine',
           sourceLink: 'https://files.hasbaratracker.com/13Feb_2001_voiceofpalestine_report.png',
           archiveLink: 'https://files.hasbaratracker.com/13Feb_2001_voiceofpalestine_report.png',
       },
   ]
},

 {
     claimTitle: 'Hamas were carrying instructions on how to make chemical weapons',
     date: '7 Oct 2004',
     claim: {
         claimText: 'Context',
         claimTag: 'context-tag',
     },
     description: {
         summary: 'Precedent: Fabricated claims of chemical weapons used to justify invasion of Iraq',
         details: 'The American George W. Bush administration manufactured and fabricated claims of weapons of mass destruction in Iraq in 2003 as a precursor to invading the country.<br><br>In 2004, the verdict – following two years of searching – revealed there were no weapons of mass destruction in Iraq.',
     },
     sources: [
         {
             sourceName: 'The Guardian',
             sourceLink: 'https://www.theguardian.com/world/2004/oct/07/usa.iraq1',
             archiveLink: 'https://archive.ph/qOn1e',
         },
     ]
 },

 {
     claimTitle: 'Hamas were carrying instructions on how to make chemical weapons',
     date: '10 Oct 2023',
     claim: {
         claimText: 'Context',
         claimTag: 'context-tag',
     },
     description: {
         summary: 'The Israeli state’s use of chemical weapons: White phosphorous',
         details: 'The Israeli state used the banned chemical weapon white phosphorous against Lebanese civilians during the Israeli occoupations of Lebanon in 1982 and in 2006, and against Palestinian civilians in Gaza during multiple attacks and besiegements, first used in 2008 and 2009, which killed over 1,400 Palestinians.<br><br>Days after Operation Al-Aqsa Flood on 7 October, 2023, Human Rights Watch verified video evidence of Israeli forces using white phosphorous in Gaza and in Lebanon.',
     },
     sources: [
         {
             sourceName: 'Human Rights Watch',
             sourceLink: 'https://www.hrw.org/news/2023/10/12/israel-white-phosphorus-used-gaza-lebanon',
             archiveLink: 'https://archive.md/u4ZUW',
         },
     ]
 },


 {
     claimTitle: 'Hamas were carrying instructions on how to make chemical weapons',
     date: '12 Oct 2023',
     claim: {
         claimText: 'Claim',
         claimTag: 'claim-tag',
     },
     description: {
         summary: 'Israeli military claims it found an ‘al-Qaeda/ISIS’ training booklet on the body of one Hamas fighter',
         details: 'The official Israel Occupation Forces account @idfonline on X (formerly Twitter) claimed ‘an al-Qaeda/Daesh training and inspiration booklet’ was found with the dead body of a Hamas fighter in Kibbutz Be’eri.<br><br>Translated from Hebrew to English, the post reads: ‘The cover of an al-Qaeda/ISIS training and inspiration booklet that was found on the body of a terrorist who infiltrated the territory of the State of Israel’ along with an image of what is the front of the booklet.’',
     },
     sources: [
         {
             sourceName: '@idfonline on X',
             sourceLink: 'https://twitter.com/idfonline/status/1712522756556722600',
             archiveLink: 'https://archive.is/tRb3Y',
         },
     ]
 },

  {
     claimTitle: 'Hamas were carrying instructions on how to make chemical weapons',
     date: '15 Oct 2023',
     claim: {
         claimText: 'Claim',
         claimTag: 'claim-tag',
     },
     description: {
         summary: 'Israeli President claims on CNN another ‘al-Qaeda’ booklet found on how to ‘take captives’ on the ‘body of one of the terrorists’',
         details: 'In an interview with US outlet CNN, Israeli President Isaac Herzog claimed occupation forces found an instruction guide on how to torture, abduct and kidnap people.',
     },
     sources: [
         {
             sourceName: 'Isaac Herzog on X',
             sourceLink: 'https://twitter.com/Isaac_Herzog/status/1713661051986678189?lang=en-GB',
             archiveLink: 'https://files.hasbaratracker.com/15Oct_Isaac_Herzog_CNN_interview.mp4',
             videoPreviewLink: 'https://files.hasbaratracker.com/15Oct_Isaac_Herzog_CNN_interview.mp4',
         },
     ]
 },

  {
     claimTitle: 'Hamas were carrying instructions on how to make chemical weapons',
     date: '15 Oct 2023',
     claim: {
         claimText: 'Claim',
         claimTag: 'claim-tag',
     },
     description: {
         summary: 'Israeli Ministry of Foreign Affairs repeats claim that ‘captive taking handbook’ was found on Hamas fighter',
         details: 'The Israeli Ministry of Foreign Affairs shared a press release describing how Israeli President Isaac Herzog showed viewers a booklet entitled ‘The Warrior’s Guide - Jihad Version’ that was ‘recovered in the battlefield on a Hamas terrorist’.',
     },
     sources: [
         {
             sourceName: 'Israeli Ministry of Foreign Affairs ',
             sourceLink: 'https://www.gov.il/en/departments/news/president-herzog-reveals-hamas-captive-taking-handbook-15-oct-2023#:~:text=In%20CNN%20interview%2C%20President%20Herzog,shocks%20and%20carry%20out%20executions.',
             archiveLink: 'https://archive.md/h8o5S',
         },
     ]
 },

 {
     claimTitle: 'Hamas were carrying instructions on how to make chemical weapons',
     date: '21 Oct 2023',
     claim: {
         claimText: 'Claim',
         claimTag: 'claim-tag',
     },
     description: {
         summary: 'Anonymous Israeli officials claim booklet had instructions on how to make a cyanide bomb and was found on a USB stick',
         details: 'Israeli officials again claimed they found the ‘2003 al-Qaeda manual’ on a USB stick on the body of a Hamas fighter, adding that it also included instructions for the production of a ‘cyanide dispersion device’, according to two unnamed Israeli officials and a copy of a classified Israeli Foreign Ministry cable given to US news outlet Axios’ reporter Barak Ravid in an exclusive article.<br><br>The Axios report stated that in the cable, the Israeli Foreign Ministry instructed diplomats to tell their counterparts that Hamas wants ‘to conduct attacks in a similar way that ISIS tried to do’.',
     },
     sources: [
         {
             sourceName: 'Axios',
             sourceLink: 'https://www.axios.com/2023/10/21/israel-hamas-cyanide-weapon-instructions',
             archiveLink: 'https://archive.is/wjSVX',
         },
     ]
 },

  {
     claimTitle: 'Hamas were carrying instructions on how to make chemical weapons',
     date: '21 Oct 2023',
     claim: {
         claimText: 'Context',
         claimTag: 'context-tag',
     },
     description: {
         summary: 'Axios reporter Barak Ravid with cyanide bomb ‘scoop’ is a former member of the Israeli military intelligence unit, Unit 8200',
         details: 'Barak Ravid, a reporter for US news outlet Axios and formerly Israeli newspaper Ha’aretz, was a member of the Israeli military intelligence unit Unit 8200, and remained a reservist for the occupation forces until March 2023.',
     },
     sources: [
         {
             sourceName: 'Forward',
             sourceLink: 'https://forward.com/opinion/205716/meet-the-good-kids-who-refuse-to-spy-for-israel/',
             archiveLink: 'https://archive.ph/NwBBc',
         },
     ]
 },

 {
     claimTitle: 'Hamas were carrying instructions on how to make chemical weapons',
     date: '22 Oct 2023',
     claim: {
         claimText: 'Claim',
         claimTag: 'claim-tag',
     },
     description: {
         summary: 'Israeli President claims instructions on how to make chemical weapons found on body of Hamas fighter',
         details: 'Israeli President Isaac Herzog held up the booklet the Israeli military shared on 12 October, 2023, in an interview with UK news outlet Sky News.<br><br>He claimed it included ‘training materials for the use of chemical warfare agents’ found on the ‘body of one of those sadistic villains’.<br><br>‘This is material which was found on the body of one of those sadistic villains. It’s al-Qaeda material, official al-Qaeda material. When dealing with ISIS, al-Qaeda, and Hamas, this is what we’re dealing with. And in this material, there were instructions, how to produce chemical weapons.’<br><br>Sky News noted that it was unable to independently verify the claims.',
     },
     sources: [
         {
             sourceName: 'Sky News',
             sourceLink: 'https://news.sky.com/story/hamas-terrorists-were-carrying-instructions-on-how-to-make-chemical-weapons-israeli-president-claims-12990547',
             archiveLink: 'https://archive.md/d9XUO',
         },
         {
             sourceName: 'Sky News on YouTube',
             sourceLink: 'https://www.youtube.com/watch?v=iNJgylkJKvI&ab_channel=SkyNews',
             archiveLink: 'https://files.hasbaratracker.com/22Oct_2023_Isaac_Herzog_Sky_News.mp4',
             videoPreviewLink: 'https://files.hasbaratracker.com/22Oct_2023_Isaac_Herzog_Sky_News.mp4',
         }
     ]
 },

 {
     claimTitle: 'Hamas were carrying instructions on how to make chemical weapons',
     date: '23 Oct 2023',
     claim: {
         claimText: 'Claim',
         claimTag: 'claim-tag',
     },
     description: {
         summary: 'Israeli Prime Minister’s Office says ‘training materials for the use of chemical warfare agents’ found on USB',
         details: 'The Israeli Prime Minister’s Office repeated Israeli President Isaac Herzog’s claims to Sky News. In its statement it wrote: ‘A USB key found on the body of a Hamas terrorist who infiltrated Israeli territory, was found to contain detailed instructions on creating chemical weapons and implementing their use among the civilian population. The source of the document is a manual from the al-Qaeda terrorist organisation dated 2003.’<br><br>‘Revealed materials found on the bodies of Hamas terrorists, including training materials for the use of chemical warfare agents, intended to be used by the terrorist organisation in its murderous rampage against innocent civilians.’',
     },
     sources: [
         {
             sourceName: 'Israeli Prime Minister’s Office',
             sourceLink: 'https://www.gov.il/en/departments/news/ironswords231020233',
             archiveLink: 'https://archive.md/DIshr',
         },
     ]
 },

  {
     claimTitle: 'Hamas were carrying instructions on how to make chemical weapons',
     date: '23 Oct 2023',
     claim: {
         claimText: 'Debunk',
         claimTag: 'debunk-tag',
     },
     description: {
         summary: 'The document does not contain chemical weapons instructions, is a short biography',
         details: 'The document shown and provided by Israeli President Isaac Herzog as evidence of Hamas’ intent to build and use chemical weapons contains no instructions on how to make chemical weapons and is, in fact, a biography of Ramzi Yousef, an al-Qaeda operative who is in prison for his attack on the World Trade Centre in 1993.',
     },
     sources: [
         {
             sourceName: 'Middle East Eye',
             sourceLink: 'https://www.middleeasteye.net/news/israel-palestine-war-chemical-weapons-manual-biography-bomber',
             archiveLink: 'https://archive.is/i1JNg',
         },
     ]
 },

  {
     claimTitle: 'Hamas were carrying instructions on how to make chemical weapons',
     date: '23 Oct 2023',
     claim: {
         claimText: 'Debunk',
         claimTag: 'debunk-tag',
     },
     description: {
         summary: 'Israeli military general Michael Edelstein cannot verify if Hamas fighters were in posession of instructions',
         details: 'When asked about whether Palestinian fighters had chemical weapons capabilities, Israeli military general Michael Edelstein said ‘we are still looking for evidence about whether they had it or not.’',
     },
     sources: [
         {
             sourceName: 'Sky News',
             sourceLink: 'https://news.sky.com/story/israel-says-it-has-evidence-of-iranian-involvement-in-hamas-attack-but-cannot-elaborate-12991025',
             archiveLink: 'https://archive.md/i1JNg',
         },
     ]
 },

  {
     claimTitle: 'Hamas were carrying instructions on how to make chemical weapons',
     date: '24 Oct 2023',
     claim: {
         claimText: 'Debunk',
         claimTag: 'debunk-tag',
     },
     description: {
         summary: 'Diagrams shown on TV by Israeli President from different sources, not the manual they claimed it came from',
         details: 'Israeli President Isaac Herzog showed a labelled diagram of a bomb with one version in Arabic, the second in English, in one of his interviews, however neither diagram exists in the manuals Israeli forces purported to find.<br><br>Aimen Dean, former ISIS member confirmed to Sky News that the diagram shown by Herzog was one that he had made while in ISIS.',
     },
     sources: [
         {
             sourceName: 'Sky News',
             sourceLink: 'https://www.youtube.com/watch?v=u4ycA8tbEuQ&ab_channel=SkyNews',
             archiveLink: 'https://files.hasbaratracker.com/24Oct_2023_Isaac_Herzog_manual_debunk.mp4',
             videoPreviewLink: 'https://files.hasbaratracker.com/24Oct_2023_Isaac_Herzog_manual_debunk.mp4',
         },
     ]
 },

]

// TEMPLATE DATA SET (copy and paste this as much as you need it)

// {
//     claimTitle: '',
//     date: '',
//     claim: {
//         claimText: '',
//         claimTag: '',
//     },
//     description: {
//         summary: '',
//         details: '',
//     },
//     sources: [
//         {
//             sourceName: '',
//             sourceLink: '',
//             archiveLink: '',
//             videoPreviewLink: '',
//         },
//         {
//             sourceName: '',
//             sourceLink: '',
//             archiveLink: '',
//             videoPreviewLink: '',
//         }
//     ]
// },

export { data, summaries };
 