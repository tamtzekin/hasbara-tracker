import logo from '../logo.svg';
import React from 'react';
import { Link } from 'react-router-dom';
import './ClaimPage.css';
import VideoPlayer from './VideoPlayer';

const ClaimA = () => {
    return (
    <>
        <span class="claim-header-container">
            <Link to="/claims"><div className="arrow">←</div></Link>
            <h1 class="claim-heading">Claim: 40 beheaded babies</h1>
        </span>

        <span class="table-container">
            <table>
                <colgroup>
                    <col style={{ width: '1%'}} />
                    <col style={{ width: '1%'}} />
                    <col style={{ width: '20%'}} />
                    <col style={{ width: '15%'}} />
                </colgroup>

            <thead>
                <tr>
                    <th>Date</th>
                    <th>Claim</th>
                    <th>Description</th>
                    <th>Sources</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td><div class="date">10 Oct</div></td>

                    <td><span class="claim-tag">Claim</span></td>

                    <td><details><summary>Babies and toddlers were found with their “heads decapitated” in the Kfar Aza kibbutz<span class="expand-text"></span></summary>

                    A spokesperson for the Israeli state's prime minister claimed babies and toddlers were found with their "heads decapitated" in the Kfar Aza kibbutz after Hamas fighters entered occupied Palestine on October 7, 2023.<br />
                    <br />

                    Nicole Zedeck, a reporter with Tel Aviv-based news channel i24, interviewed Israeli occupation force soldier David Ben Zion who made the same claim on October 10, 2023. He said: "They cut heads of children, they cut heads of women." 
                    </details></td>

                    <td>
                    <VideoPlayer videoLink="/files/i24NEWS_10Oct.mp4"><a href="https://archive.ph/QeCXs" target="_blank" rel="noreferrer"><span class="play-arrow"></span>i24NEWS: ‘Horror scenes at kibbutz liberated from Hamas’</a></VideoPlayer><br />

                    <br /><a href="https://archive.ph/AhYIH" target="_blank" rel="noreferrer">Nicole Zedeck on X</a></td>
                </tr>


                <tr>
                    <td><div class="date">10 Oct</div></td>

                    <td><span class="claim-tag">Claim</span></td>

                    <td><details><summary>CNN reporter Nic Robertson claims babies' heads cut off<span class="expand-text"></span></summary>
                    
                    Nic Robertson, a CNN reporter, claimed Palestinian resistance fighters carried out "ISIS-style executions" by "cutting the heads off of people" including babies and killing their pets.<br />
                    <br />
                    
                    "Men, women, children, hands bound, shot, executed, heads cut."
                    </details></td>
                
                    <td><VideoPlayer videoLink="/files/CNN_NicRobertson_10Oct.mp4"><a href="https://archive.ph/XRmh4" target="_blank" rel="noreferrer"><span class="play-arrow"></span>CNN: ‘IDF, women, toddlers, elderly “butchered” by Hamas in Kfar Aza’</a></VideoPlayer><br />
                    <br />
                    
                    <VideoPlayer videoLink="/files/IG_NicRobertson_10Oct.mp4"><a href="https://www.instagram.com/p/CyOI6Ztsftq/" target="_blank" rel="noreferrer"><span class="play-arrow"></span>Nic Robertson on Instagram</a></VideoPlayer>
                    </td>
                </tr>


                <tr>
                    <td><div class="date">11 Oct</div></td>

                    <td><span class="claim-tag">Claim</span></td>

                    <td><details><summary>US President Biden claims he saw 'pictures' of babies being beheaded</summary><span class="expand-text"></span>
                    In an address to Jewish community leaders on October 11, 2023, Biden claimed: "I never really thought that I would see and have confirmed pictures of terrorists beheading children.”
                    </details></td>
                    
                    <td><VideoPlayer videoLink="/files/Fox_Biden_10Oct.mp4"><a href="https://archive.ph/UN3Jd" target="_blank" rel="noreferrer"><span class="play-arrow"></span>Fox News: ‘Biden making remarks on U.S. support for Israel’</a></VideoPlayer></td>
                </tr>


                <tr>
                    <td><div class="date">11 Oct</div></td>

                    <td><span class="debunk-tag">Debunk</span></td>

                    <td><details><summary>White House official clarifies Biden did not see pictures of decapitated babies<span class="expand-text"></span></summary>
                    An administration official later clarified Biden’s remarks, saying that Biden was referring to public statements from officials and media reports and had not actually seen photos.
                    </details></td>

                    <td>NO SOURCES?</td>

                </tr>


                <tr>
                    <td><div class="date">11 Oct</div></td>

                    <td><span class="claim-tag">Claim</span></td>

                    <td><details><summary>Sara Sidner, CNN reporter, repeated the Israeli state claim that babies were beheaded<span class="expand-text"></span></summary>
                    In a CNN news report, Sidner claimed babies and toddlers were found with their "heads decapitated" in Kfar Aza.
                    </details></td>

                    <td>
                        <VideoPlayer videoLink="/files/CNNTV_11Oct.mp4"><a href="https://archive.ph/wpEIM" target="_blank" rel="noreferrer"><span class="play-arrow"></span>CNN: ‘Netanyahu’s office releases photos of “babies murdered and burned” by Hamas’</a></VideoPlayer></td>
                    </tr>


                <tr>
                    <td><div class="date">11 Oct</div></td>

                    <td><span class="debunk-tag">Debunk</span></td>

                    <td><details><summary>IOF won't back up decapitated babies claim because it is 'disrespectful for the dead'<span class="expand-text"></span></summary>
                    Israeli occupation force soldier Major Nir Dinar said the IOF refused to share the exact number of babies killed or how many had been beheaded as it is "disrespectful for the dead".
                    </details></td>

                    <td>
                        <a href="https://archive.ph/Otjey" target="_blank" rel="noreferrer">Insider: IDF says it won't back up its claim that Hamas decapitated babies in Israel because it is 'disrespectful for the dead'</a></td>
                
                </tr>


                <tr>
                    <td><div class="date">11 Oct</div></td>

                    <td><span class="claim-tag">Claim</span></td>

                    <td><details><summary>Netanyahu spokesperson 'confirms' decapitated babies<span class="expand-text"></span></summary>
                    Tal Heinrich spokesperson for the Israeli Prime Minister's Office ‘confirmed’ soldiers on the ground had been dealing with babies who had been decapitated to LBC in the UK.
                    </details></td>

                    <td>
                    <VideoPlayer videoLink="/files/LBC_11Oct.mp4"><a href="https://archive.is/UwDCO" target="_blank" rel="noreferrer"><span class="play-arrow"></span>LBC: ‘Toddlers, babies with their heads cut off’</a></VideoPlayer></td>
                </tr>


                <tr>
                    <td><div class="date">11 Oct</div></td>

                    <td><span class="context-tag">Context</span></td>

                    <td><details><summary>Israeli occupation reservist David Ben Zion is a settler leader who incited riots<span class="expand-text"></span></summary>
                    After an Israeli reserve soldier named David Ben Zion told a reporter Palestinian militants “cut [off] heads of babies,” Biden, Netanyahu, and the international media amplified the dubious claim. The Grayzone has identified Ben Zion as a fanatical settler leader who incited riots by demanding a Palestinian town be “wiped out.”
                    </details></td>

                    <td>
                        <a href="https://archive.is/NcD6m" target="_blank" rel="noreferrer">Metro: ‘40 babies murdered by Hamas’</a></td>
                </tr>


                <tr>
                    <td><div class="date">12 Oct</div></td>
                
                    <td><span class="debunk-tag">Debunk</span></td>

                    <td><details><summary>Sara Sidner of CNN retracts and apologises for sharing the claim<span class="expand-text"></span></summary>
                    In a post on X (formerly Twitter), CNN reporter Sara Sidner apologies for sharing disinformation:<br />
                    "Yesterday the Israeli Prime Minister's office said that it had confirmed Hamas beheaded babies and children while we were live on the air. The Israeli government now says today it CANNOT confirm babies were beheaded. I needed to be more careful with my words and I am sorry.</details></td>

                    <td><a href="https://archive.is/rom8W" target="_blank" rel="noreferrer">Sara Sidner on X</a></td>
                </tr>


                <tr>
                    <td><div class="date">12 Oct</div></td>

                    <td><span class="debunk-tag">Debunk</span></td>

                    <td><details><summary>CNN retracts reporting that Palestinian resistance fighters decapitated babies<span class="expand-text"></span></summary>
                    CNN publishes an article stating that 'Israeli official says government cannot confirm babies were beheaded in Hamas attack'.
                    </details></td>

                    <td>
                        <a href="https://archive.ph/icFaG" target="_blank" rel="noreferrer">CNN: Israeli official says government cannot confirm babies were beheaded in Hamas attack</a></td>
                
                </tr>


                <tr>
                    <td><div class="date">12 Oct</div></td>

                    <td><span class="claim-tag">Claim</span></td>

                    <td><details><summary>IOF spokesperson says "relatively confident" that babies were beheaded<span class="expand-text"></span></summary>
                    In a video shared by the official IDF account (Israeli occupation forces), Israeli occupation force spokesperson Jonathon Conricus claimed Palestinian resistance fighters had "likely" carried out decapitations of babies in the Be’eri kibbutz.<br />
                    “We got very very disturbing reports that came from the ground that there were babies that had been beheaded… I think we can now say with relative confidence that unfortunately this is what happened in Be’eri."
                    </details></td>

                    <td>
                        <VideoPlayer videoLink="/files/GolanVach_12Oct.mp4"><a href="https://www.youtube.com/watch?v=Wsbd_dV8Xf8" target="_blank" rel="noreferrer"><span class="play-arrow"></span>Daily Mail: Israel frontline: 'I saw a beheaded baby' - Inside Kibbutz where Hamas killed 108 people</a></VideoPlayer></td>
                
                </tr>

                <tr>
                    <td><div class="date">12 Oct</div></td>

                    <td><span class="claim-tag">Claim</span></td>

                    <td><details><summary>The Jerusalem Post claims beheaded babies claims are 'correct' <span class="expand-text"></span></summary>
                    The Jerusalem Post, an Israeli newspaper, wrote on X (formerly Twitter) on October 12, 2023, that it can "confirm based on verified photos of the bodies that the reports of babies being burnt and decapitated in Hamas's assault on Kfar Aza are correct. May their memory be a blessing."
                    </details></td>

                    <td>
                        <a href="https://archive.ph/9c9L0" target="_blank" rel="noreferrer">The Jerusalem Post on X</a></td>
                </tr>


                <tr>
                    <td><div class="date">12 Oct</div></td>

                    <td><span class="debunk-tag">Debunk</span></td>

                    <td><details><summary>IDF Spokesperson Maj. Doron Spielman told NBC News: "That specific report and that number I can’t confirm."<span class="expand-text"></span></summary>
                    Main text
                    </details></td>

                    <td><a href="" target="_blank" rel="noreferrer">NBC News NO SOURCE LINK?</a></td>
                
                </tr>


                <tr>
                    <td><div class="date">13 Oct</div></td>

                    <td><span class="debunk-tag">Debunk</span></td>

                    <td><details><summary>Israeli military: "We cannot confirm but you can assume it happened."<span class="expand-text"></span></summary>
                    Al Jazeera reports that when journalists asked a spokesman for the Israeli military about the story of beheaded babies, the reply was, “We cannot confirm but you can assume it happened.
                    </details></td>

                    <td><a href="https://archive.ph/RNLTs" target="_blank" rel="noreferrer">Al Jazeera: Watching the watchdogs: Babies and truth die together in Israel-Palestine</a></td>
                </tr>



                <tr>
                    <td><div class="date">18 Oct</div></td>

                    <td><span class="claim-tag">Claim</span></td>

                    <td><details><summary>US President Joe Biden repeats claim in a visit to Tel Aviv in the Israeli state (historic occupied Palestine)<span class="expand-text"></span></summary>
                    In his speech, US President Biden states: "Children slaughtered.  Babies slaughtered.  Entire families massacred. Rape, beheadings, bodies burned alive."
                    </details></td>

                    <td>
                        <a href="https://archive.ph/yqnZT" target="_blank" rel="noreferrer">The White House:  Remarks by President Biden on the October 7th Terrorist Attacks and the Resilience of the State of Israel and its People</a></td>
                
                </tr>



                <tr>
                    <td><div class="date">26 Oct</div></td>

                    <td><span class="claim-tag">Claim</span></td>

                    <td><details><summary>The official Israel social media account claims 'one beheaded baby' and 'eight burned babies' at Beeri kibbutz<span class="expand-text"></span></summary>
                    In a post on X (formerly Twitter) on October 26, 2023, the official state of Israel account shared a video of an Israeli occupation force soldier named Col. Golan Vach telling reporters that he carried a decapitated baby in his own hands.<br />
                    <br />
                    
                    The post reads: "Listen to the eyewitness accounts of the 8 burned babies and one beheaded baby which were butchered by Hamas terrorists on October 7th. Pure evil."<br />
                    <br />
                    
                    In the video, Golan Vach states: "The baby was decapitated... I carried the baby in my own hands.”<br />
                    <br />
                    
                    When he was asked why there were no photographs, he replied: “People ask me how come you did not take a picture. I said: ‘I’m sorry, I have children. I have limitations. I have limits. I do not take a picture of a decapitated baby.’” Golan Vach also claimed a soldier was beheaded at Kfar Aza.
                    </details></td>

                    <td>
                        <VideoPlayer videoLink="/files/GolanVach_12Oct.mp4"><a href="https://archive.ph/smhK5" target="_blank" rel="noreferrer"><span class="play-arrow"></span>@Israel on X</a></VideoPlayer></td>
                
                </tr>



                <tr>
                    <td><div class="date">28 Oct</div></td>

                    <td><span class="claim-tag">Claim</span></td>

                    <td><details><summary>Founder of Israeli first-responded group claims 'little kids beheaded'<span class="expand-text"></span></summary>
                    Eli Beer, president and founder of an Israeli first-responder group called United Hatzalah of Israel told the American Republican Jewish Committee in Las Vegas at a conference: “I saw little kids who were beheaded. We didn’t know which head belongs to which kid.” He also claimed a baby was baked in an oven.
                    </details></td>

                    <td>
                        <VideoPlayer videoLink="/files/EliBeer_28Oct.mp4"><a href="https://archive.is/wkmFr" target="_blank" rel="noreferrer"><span class="play-arrow"></span>New York Post: Head of Israel’s EMS service describes horror of seeing babies slaughtered by Hamas</a></VideoPlayer></td>
                
                </tr>



                <tr>
                    <td><div class="date">15 Nov</div></td>

                    <td><span class="claim-tag">Claim</span></td>

                    <td><details><summary>US President Joe Biden repeats claims following meeting with China's President Xi Jinping<span class="expand-text"></span></summary>
                    At a press conference on November 15, 2023, Biden again repeats the debunked claim that Palestinian resistance fighters cut off babies' heads and burned women and children alive.<br />
                    <br />

                    “Hamas has already said publicly that they plan on attacking Israel again, like they did before, to where they were cutting babies’ heads off to burning women and children alive.”
                    </details></td>

                    <td>
                        <a href="https://archive.is/DK1ee" target="_blank" rel="noreferrer">The Intercept: Joe Biden keeps repeating his false claim that he saw pictures of beheaded babies</a></td>
                </tr>


                <tr>
                    <td><div class="date">12 Dec</div></td>

                    <td><span class="claim-tag">Claim</span></td>

                    <td><details><summary>US President Joe Biden repeats that he saw beheaded infants, claims mother and daughter tied up and burnt<span class="expand-text"></span></summary>
                    In a speech at Salamander Washington D.C., US President Biden once again repeated the claim that babies were beheaded.<br />
                    <br />

                    “I saw some of the photographs when I was there — tying a mother and her daughter together on a rope and then pouring kerosene on them and then burning them, beheading infants, doing things that are just inhuman — totally, completely inhuman.”
                    </details></td>

                    <td><a href="https://archive.ph/cOJQW" target="_blank" rel="noreferrer">The White House: Remarks by President Biden at a Campaign Reception</a></td>
                
                </tr>


   <tr>
    <td>
        
        <div class="date">NO DATE</div></td>

        <td><span class="context-tag">Context</span></td>

    <td><details><summary>Kibbutzes on massacred and occupied Palestinian land<span class="expand-text"></span></summary>Kfar Aza is a kibbutz on occupied Palestinian land in what is considered 'southern Israel'. In 1948, Zionist militias ethnically cleansed the Palestinian village of Najd, and the Israeli settler-colony created the city of Sderot where the kibbutz is close to. The kibbutz is also near the Israeli state's city Netivot, a part of Gaza that was ethnically cleansed in the Nakba of 1948, originally named Arab Suqrir."</details></td>

    <td>

        <a class="media-source" href="https://archive.ph/RNLTs" target="_blank" rel="noreferrer">Al Jazeera: ‘Watching the watchdogs: Babies and truth die together in Israel-Palestine’</a></td>
   </tr>

        </tbody>
      </table>
  </span>
    </>
  );
};

export default ClaimA;
