const newsData = [
    {
        description: "As COVID-19 cases spike across the country, inundating hospital systems and prompting new restrictions on economic activity in some states, it’s important to keep a key distinction in mind, at least when it comes to your own place in the tangled pandemic mess…",
        title: "What to Do If You're Exposed to COVID-19",
        url: "https://lifehacker.com/what-to-do-if-youre-exposed-to-covid-19-1845860079",
        urlToImage: "https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/p50py7kqughypgvpn4wd.jpg"
    },
    {
        description: "Starting later this week, people in California will be able to take another step to slow the spread of COVID-19 when the most populous state in the US rolls its own COVID exposure notification app. You’ll be able to enroll in CA Notify starting on Thursday, D…",
        title: "California's COVID-19 exposure notification app starts rolling out",
        url: "https://www.engadget.com/california-covid-19-exposure-notification-app-235001952.html",
        urlToImage: "https://o.aolcdn.com/images/dims?resize=1200%2C630&crop=1200%2C630%2C0%2C0&quality=95&image_uri=https%3A%2F%2Fs.yimg.com%2Fos%2Fcreatr-uploaded-images%2F2020-12%2Fea692660-3f08-11eb-aff9-b2a3543199a6&client=amp-blogside-v2&signature=d69ed10b854285aa67102b2223f2577d088d6b11"
    },
    {
        description: "Facebook is doing more to alert users who have shared dangerous misinformation about the coronavirus pandemic. The social network is introducing a new notification that will tell users that a post they liked, shared or commented on has been removed due to “po…",
        title: "Facebook adds new notifications for COVID-19 misinformation",
        url: "https://www.engadget.com/facebook-notifications-harmful-coronavirus-misinformation-191233820.html",
        urlToImage: "https://o.aolcdn.com/images/dims?resize=1200%2C630&crop=1200%2C630%2C0%2C0&quality=95&image_uri=https%3A%2F%2Fs.yimg.com%2Fos%2Fcreatr-uploaded-images%2F2020-12%2Fb5fcb990-443b-11eb-b6cf-3f1374726c0f&client=amp-blogside-v2&signature=55773087e9110269608da41e83dbb653249f4247",
    }, 
    {
        description: "US Congress has finally passed a new spending bill with COVID-19 relief measures, which on the one hand is good news for many Americans. As often happens with crucial legislation, however, lawmakers tacked on some extra legislation, including a controversial …",
        title: "Congress approves COVID-19 spending bill with contentious copyright measures",
        url: "https://www.engadget.com/covid-19-spending-bill-passes-with-new-streaming-copyright-law-tacked-on-102046838.html",
        urlToImage: "https://o.aolcdn.com/images/dims?resize=1200%2C630&crop=1200%2C630%2C0%2C0&quality=95&image_uri=https%3A%2F%2Fs.yimg.com%2Fos%2Fcreatr-uploaded-images%2F2020-12%2Fb5fcb990-443b-11eb-b6cf-3f1374726c0f&client=amp-blogside-v2&signature=55773087e9110269608da41e83dbb653249f4247"
    },
    {
        description: "Starting next week, Twitter will begin removing tweets that make false or misleading claims about COVID-19 vaccines. Posts that suggest vaccines can harm or control people, that make false claims about their adverse side-effects or that suggest COVID-19 isn’t…",
        title: "Twitter will start removing COVID-19 vaccine misinformation next week",
        url: "https://www.engadget.com/twitter-covid-19-vaccine-misinformation-policy-204452958.html",
        urlToImage: "https://o.aolcdn.com/images/dims?resize=1200%2C630&crop=1200%2C630%2C0%2C0&quality=95&image_uri=https%3A%2F%2Fs.yimg.com%2Fos%2Fcreatr-uploaded-images%2F2020-12%2F4c505580-3e49-11eb-bfbf-76c6d8513e08&client=amp-blogside-v2&signature=b02779f018c0a7f9547724bac1d96d531e8cb9b2"
    }, 
    {
        description: "The US health care system has always been unequal, but Covid-19 has revealed it to be absurd.",
        title: "The Free Market Approach to This Pandemic Isn't Working",
        url: "https://www.wired.com/story/the-free-market-approach-to-this-pandemic-isnt-working/",
        urlToImage: "https://media.wired.com/photos/5fc55084d840498ab676cf1f/191:100/w_1280,c_limit/Free-Market-Healthcare.jpg",
    },
    {
        description: "Twitter has announced that it will start removing coronavirus vaccine misinformation from its platform, including harmful conspiracy theories related to inoculation efforts.",
        title: "Twitter says it will start removing COVID-19 vaccine misinformation",
        url: "https://www.theverge.com/2020/12/16/22179074/twitter-coronavirus-misinformation-covid19-vaccine-vaccination-label",
        urlToImage: "https://cdn.vox-cdn.com/thumbor/giU_BUhPLHDoWcncob_qvRxDm-M=/0x146:2040x1214/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/20086268/acastro_200715_1777_twitter_0004.0.jpg",
    },
    {
        description: "Because of Covid-19, developers are realizing that incorporating health concerns in a building's design isn’t just a luxury—it’s a necessity.",
        title: "The ‘Healthy Building’ Surge Will Outlast the Pandemic",
        url: "https://www.wired.com/story/healthy-building-outlast-pandemic/",
        urlToImage: "https://o.aolcdn.com/images/dims?resize=1200%2C630&crop=1200%2C630%2C0%2C0&quality=95&image_uri=https%3A%2F%2Fs.yimg.com%2Fos%2Fcreatr-uploaded-images%2F2020-12%2F7aa35270-35a2-11eb-b7fc-92061413f253&client=amp-blogside-v2&signature=03866ef66bfa401b197ad3c212539163a7799cb4",
    },
    {
        description: "Google announced today it’s introducing a new search feature that will surface a list of authorized vaccines in users’ location, as well as informational panels about each individual vaccine. The feature is first being launched in the U.K., which earlier this…",
        title: "Google to add Covid-19 vaccine information panels to Search",
        url: "http://techcrunch.com/2020/12/10/google-to-add-covid-19-vaccine-information-panels-to-search/",
        urlToImage: "https://techcrunch.com/wp-content/uploads/2020/11/GettyImages-1229305344.jpg?w=600",
    },
    {
        description: "In the face of so much uncertainty caused by the COVID-19 pandemic, it’s tempting to search for answers that might help you regain some sense of control over your life. You might, for instance, find yourself reading the advice of self-appointed health “expert…",
        title: "You Can't Beat COVID-19 With Diet, No Matter What the Internet Tells You",
        url: "https://vitals.lifehacker.com/you-cant-beat-covid-19-with-diet-no-matter-what-the-in-1845887090",
        urlToImage: "https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/hzozadstd3zyeb1fkvi6.png",
    },
    {
        description: "Singapore thought it had found a way to let people back on board - until a positive test mid-cruise.",
        title: "Covid-19: How Covid cruise ships are navigating troubled waters",
        url: "https://www.bbc.co.uk/news/av/world-55241333",
        urlToImage: "https://ichef.bbci.co.uk/images/ic/400xn/p090z9l6.jpg",
    },
    {
        description: "The agency is close to authorizing Pfizer's Covid-19 shot. That raises questions about the fate of study volunteers and lost opportunities to collect their data.",
        title: "The FDA's Green Light for a Vaccine Might Tank Ongoing Trials",
        url: "https://www.wired.com/story/the-fdas-green-light-for-a-vaccine-might-tank-ongoing-trials/",
        urlToImage: "https://media.wired.com/photos/5fd2356c0974393cc0952bae/191:100/w_1280,c_limit/Science_Pfizer_1230009050.jpg",
    },
    {
        description: "To cope with Covid-19 lockdowns, many folks watched older films at home. Some tackled the AFI 100, or picked a favorite director. I picked a theme.",
        title: "My Year Watching Submarine Movies",
        url: "https://www.wired.com/story/submarine-movies-appreciation/",
        urlToImage: "https://media.wired.com/photos/5fe0d2d74287adae9128f5ac/191:100/w_1280,c_limit/Culture_YIR_submarine_FE023.jpg",
    },
    {
        description: "This month's list focuses on cases relating to Covid-19, as thousands of individuals have called on the UN to free jailed journalists amid the ongoing pandemic.",
        title: "One Free Press Coalition Spotlights Journalists Under Attack - December 2020",
        url: "https://www.wired.com/story/one-free-press-coalition-spotlights-journalists-under-attack-december-2020/",
        urlToImage: "https://media.wired.com/photos/5fc553269dbb584d0fef36be/191:100/w_1280,c_limit/one-free-press-november-2020-mohammad-mosaed.jpg",
    },
    {
        description: "A cyberattack on servers belonging to the European Medicines Agency—the EU regulatory body responsible COVID-19 vaccine approval—has resulted in the “unlawful access” of internal documents detailing the development of a potential COVID-19 vaccine. Read more...",
        title: "Hackers Illegally Accessed Pfizer's Preliminary Vaccine Data",
        url: "https://gizmodo.com/hackers-illegally-accessed-pfizers-preliminary-vaccine-1845846341",
        urlToImage: "https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/j8hshzbag7jknvbrakny.jpg",
    },
    {
        description: "A COVID-19 vaccine safety monitoring system could be vulnerable to false reports. Registration is through a QR code given out on a piece of paper.",
        title: "COVID-19 vaccine monitoring program may be at risk of false reports",
        url: "https://www.theverge.com/2020/12/7/22160066/covid-vaccine-safety-monitoring-security-texting-survey",
        urlToImage: "https://cdn.vox-cdn.com/thumbor/xpl2o5MasJygtIBIzAXO6O-hVrs=/0x355:5000x2973/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/22152017/1229760024.jpg",
    },
    {
        description: "The experience of the passage of time felt weird in 2020 as the COVID-19 pandemic unfolded. Trauma, stress, and uncertainty can all change how time feels.",
        title: "The pandemic ruined time",
        url: "https://www.theverge.com/2020/12/15/22167586/pandemic-time-perception-2020-covid",
        urlToImage: "https://cdn.vox-cdn.com/thumbor/fA2qiB1ynyCGYJzAb_S2D8f9PKw=/0x146:2040x1214/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/22159890/acastro_201209_4329_distoredTime_0001.jpg",
    },
    {
        description: "Since the start of the coronavirus pandemic, we’ve seen hackers target efforts to develop a COVID-19 vaccine, but it now seems they’re shifting their attention to the supply chain that will distribute those vaccines to people across the world.  IBM says it re…",
        title: "Hackers are trying to disrupt the COVID-19 vaccine supply chain",
        url: "https://www.engadget.com/ibm-covid-19-cold-chain-201727810.html",
        urlToImage: "https://o.aolcdn.com/images/dims?resize=1200%2C630&crop=1200%2C630%2C0%2C0&quality=95&image_uri=https%3A%2F%2Fs.yimg.com%2Fos%2Fcreatr-uploaded-images%2F2020-12%2F7aa35270-35a2-11eb-b7fc-92061413f253&client=amp-blogside-v2&signature=03866ef66bfa401b197ad3c212539163a7799cb4",
    },
    {
        description: "Two companies looking to build a hyperloop transport system are taking very different approaches. In the US, Virgin Hyperloop is working hard to develop its technology almost entirely under its own power, while in Europe, its major rival, Hyperloop Transporta…",
        title: "In the face of COVID-19, one hyperloop company is making friends",
        url: "https://www.engadget.com/hyperloop-transportation-technologies-htt-partners-140019992.html",
        urlToImage: "https://o.aolcdn.com/images/dims?resize=1200%2C630&crop=1200%2C630%2C0%2C0&quality=95&image_uri=https%3A%2F%2Fs.yimg.com%2Fos%2Fcreatr-uploaded-images%2F2020-12%2Fcb1e2ed0-3a36-11eb-bfaf-f12b85997aae&client=amp-blogside-v2&signature=0f371b7f2eb7197a51b475c219c7202aa1c7ee8e",
    },
    {
        description: "Congress’ long-awaited COVID-19 relief bill could be good news for those who need to learn and work remotely during the pandemic. Axios has learned the package in the newly agreed deal earmarks $7 billion for broadband access. About $3.2 billion of that would…",
        title: "US COVID-19 relief bill includes $7 billion for broadband internet access",
        url: "https://www.engadget.com/covid-19-relief-bill-broadband-access-153613264.html",
        urlToImage: "https://o.aolcdn.com/images/dims?resize=1200%2C630&crop=1200%2C630%2C0%2C0&quality=95&image_uri=https%3A%2F%2Fs.yimg.com%2Fos%2Fcreatr-uploaded-images%2F2020-12%2Fc523e5d0-439e-11eb-bbfd-71f3f1cd80ca&client=amp-blogside-v2&signature=e423254273b22fbba38863d5cff75b15b57f0cf8",
    },
];

export default newsData;
