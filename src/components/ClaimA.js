import logo from '../logo.svg';
import React from 'react';
import { Link } from 'react-router-dom';
import './ClaimPage.css';
import VideoPlayer from './VideoPlayer';

const ClaimA = () => {
    return (
    <>
        <span class="header-container">
            <Link to="/claims"><div className="arrow">⭪</div></Link>
            <h1 class="claim-heading">Claim: Forty beheaded babies</h1>
            </span>

        <span class="table-container">
            <table>
                <colgroup>
                <col style={{ width: '2%'}} />
                <col style={{ width: '10%'}} />
                <col style={{ width: '10%'}} />
                {/* <col style={{ width: '5%'}} /> */}
                </colgroup>

                <tbody>
                    <tr>
                        <td><div class="date">OCT 10, 2023</div></td>
                        <td><details><summary><span class="claim-pretext">CLAIM:</span> Babies and toddlers were found with their “heads decapitated” in Kfar Aza<span class="expand-text">... more</span></summary>CLAIM: Babies and toddlers were found with their “heads decapitated” in Kfar Aza in southern Israel after Hamas’ attacks in the kibbutz over the weekend, a spokesperson for Israel's prime minister says. Nicole Zedeck, a reporter with Tel Aviv-based news channel i24 from her interview with Israeli reserve soldier David Ben Zion.</details></td>
    
                        <td><VideoPlayer videoLink="/files/i24NEWS_10Oct.mp4" externalURL="https://archive.ph/QeCXs"><a href="https://archive.ph/QeCXs" target="_blank" rel="noreferrer">▶ i24NEWS: ‘HORROR SCENES AT KIBBUTZ LIBERATED FROM HAMAS’</a></VideoPlayer><br />

                        <br /><a href="https://archive.ph/AhYIH" target="_blank" rel="noreferrer">Nicole Zedeck on X</a></td>

                        {/* <td><div class="claim">CLAIM</div></td> */}
                    </tr>

                    <tr>
                        <td><div class="date">OCT 10, 2023</div></td>
                        
                        <td><span class="claim-pretext">CLAIM:</span> Joe Biden claimed he saw ‘pictures of terrorists beheading babies’.</td>
                        
                        <td><VideoPlayer videoLink="/files/Fox_Biden_10Oct.mp4" externalURL="https://archive.ph/UN3Jd"><a href="https://archive.ph/UN3Jd" target="_blank" rel="noreferrer">▶ Fox News: ‘BIDEN MAKING REMARKS ON U.S. SUPPORT FOR ISRAEL’</a></VideoPlayer></td>
                        
                        {/* <td><div class="claim">CLAIM</div></td> */}
                    </tr>

 <tr>
  <td><div class="date">OCT 10, 2023</div></td>
  <td><details><summary><span class="claim-pretext">CLAIM:</span> Nic Robertson of CNN recalls being brought to Kfar Aza to witness the brutality Hamas brought on the community<span class="expand-text">... more</span></summary>CLAIM: Nic Robertson of CNN recalls being brought to Kfar Aza to witness the brutality Hamas brought on the community. He describes it as “ISIS-style executions” where they were “cutting the heads off of people” including babies and killing their pets. One family hid their kids in a cupboard while they tried to distract the attackers. They were killed, but the distraction worked.</details></td>
  
  <td><VideoPlayer videoLink="/files/CNN_NicRobertson_10Oct.mp4" externalURL="https://archive.ph/XRmh4"><a href="https://archive.ph/XRmh4" target="_blank" rel="noreferrer">▶ CNN: ‘IDF, WOMEN, TODDLERS, ELDERLY “BUTCHERED” BY HAMAS IN KFAR AZA’</a></VideoPlayer></td>
  
  {/* <td><div class="claim">CLAIM</div></td> */}
 </tr>

 <tr>
  <td><div class="date">OCT 11, 2023</div></td>

  <td><span class="claim-pretext">CLAIM:</span> Sara Sidner of CNN.</td>

  <td><VideoPlayer videoLink="/files/CNNTV_11Oct.mp4" externalURL="https://archive.ph/wpEIM"><a href="https://archive.ph/wpEIM" target="_blank" rel="noreferrer">▶ CNN: ‘NETANHAYU’S OFFICE RELEASES PHOTOS OF “BABIES MURDERED AND BURNED” BY HAMAS’</a></VideoPlayer></td>

  {/* <td><div class="claim">CLAIM</div></td> */}
 </tr>

 <tr>
  <td><div class="date">OCT 11, 2023</div></td>
  
  <td><span class="claim-pretext">CLAIM:</span> Sara Sidner of CNN retracts.</td>

  <td><a href="https://archive.is/rom8W" target="_blank" rel="noreferrer">Sara Sidner on X</a></td>
  {/* <td><div class="debunked">DEBUNKED</div></td> */}
 </tr>

 <tr>
  <td><div class="date">OCT 11, 2023</div></td>
  <td>DEBUNKED: IDF says it won't back up its claim that Hamas decapitated babies in Israel because it is ‘disrespectful for the dead’.</td>
  <td><a href="https://archive.ph/Otjey" target="_blank" rel="noreferrer">Business Insider: IDF says it won’t back up its claim that Hamas decapitated babies in Israel because it is ‘disrespectful for the dead’.</a></td>
  {/* <td><div class="debunked">DEBUNKED</div></td> */}
 </tr>

 <tr>
  <td><div class="date">OCT 11, 2023</div></td>
  <td><span class="claim-pretext">CLAIM:</span> Tal Heinrich spokesperson for the Israeli Prime Minister’s Office ‘confirmed’ soldiers on the ground had been dealing with babies who had been decapitated.</td>
  <td><VideoPlayer videoLink="/files/LBC_11Oct.mp4" externalURL="https://archive.is/UwDCO"><a href="https://archive.is/UwDCO" target="_blank" rel="noreferrer">▶ LBC: ‘Toddlers, babies with their heads cut off’</a></VideoPlayer></td>
  {/* <td><div class="claim">CLAIM</div></td> */}
 </tr>

   <tr>
    <td><div class="date">OCT 11, 2023</div></td>
    <td><details><summary><span class="claim-pretext">DEBUNKED:</span> After an Israeli reserve soldier named David Ben Zion told a reporter Palestinian militants “cut [off] heads of babies,” Biden, Netanyahu, and the international media amplified the dubious claim<span class="expand-text">... more</span></summary>DEBUNKED: After an Israeli reserve soldier named David Ben Zion told a reporter Palestinian militants “cut [off] heads of babies,” Biden, Netanyahu, and the international media amplified the dubious claim. The Grayzone has identified Ben Zion as a fanatical settler leader who incited riots by demanding a Palestinian town be “wiped out”.</details></td>
    <td><a class="media-source" href="https://archive.is/NcD6m" target="_blank" rel="noreferrer">Metro: ‘40 BABIES MURDERED BY HAMAS’</a></td>
    {/* <td><div class="context">CONTEXT</div><br /><br /><div class="debunked">DEBUNKED</div></td> */}
   </tr>

   <tr>
   <td><div class="date">OCT 12, 2023</div></td>
   <td><span class="claim-pretext">CLAIM:</span> Jerusalem Post</td>
   <td><a class="media-source" href="https://archive.ph/9c9L0" target="_blank" rel="noreferrer">The Jerusalem Post on X</a></td>
   {/* <td><div class="claim">CLAIM</div></td> */}
  </tr>

   <tr>
    <td><div class="date">OCT 12, 2023</div></td>
    <td><span class="claim-pretext">DEBUNKED:</span>‘Israeli official says government cannot confirm babies were beheaded in Hamas attack’.</td>
    <td><a class="media-source" href="https://archive.ph/S0ZA3" target="_blank" rel="noreferrer">CNN: ‘Israeli official says government cannot confirm babies were beheaded in Hamas attack’</a></td>
    {/* <td><div class="debunked">DEBUNKED</div></td> */}
   </tr>

   <tr>
    <td><div class="date">OCT 13, 2023</div></td>
    <td><span class="claim-pretext">DEBUNKED:</span> When journalists asked a spokesman for the Israeli military about the story, the reply was, “We cannot confirm but you can assume it happened.”</td>
    <td><a class="media-source" href="https://archive.ph/RNLTs" target="_blank" rel="noreferrer">Al Jazeera: ‘Watching the watchdogs: Babies and truth die together in Israel-Palestine’</a></td>
    {/* <td><div class="debunked">DEBUNKED</div></td> */}
   </tr>

        </tbody>
      </table>
  </span>
    </>
  );
};

export default ClaimA;
