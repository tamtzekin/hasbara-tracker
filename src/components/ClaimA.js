import logo from '../logo.svg';
import React from 'react';
import { Link } from 'react-router-dom';
import './ClaimPage.css';
import VideoPlayer from './VideoPlayer';

const ClaimA = () => {
    return (
    <>
        <span class="header-container">
            <Link to="/claims"><div className="arrow">←</div></Link>
            <h1 class="claim-heading">Claim: Forty beheaded babies</h1>
            </span>

        <span class="table-container">
            <table>
                <colgroup>
                <col style={{ width: '2%'}} />
                <col style={{ width: '1%'}} />
                <col style={{ width: '12%'}} />
                <col style={{ width: '12%'}} />
                {/* <col style={{ width: '5%'}} /> */}
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
                        <td><div class="date">10 OCT</div></td>

                        <td>Claim</td>

                        <td><details><summary>
                        <b>Babies and toddlers were found with their “heads decapitated” in the Kfar Aza kibbutz</b><span class="expand-text"> + </span></summary>
                        
                        <b>Babies and toddlers were found with their “heads decapitated” in the Kfar Aza kibbutz</b>
                        <br />
                        <br />

                        A spokesperson for the Israeli state's prime minister claimed babies and toddlers were found with their "heads decapitated" in the Kfar Aza kibbutz after Hamas fighters entered occupied Palestine on October 7, 2023.<br />
                        <br />

                        Nicole Zedeck, a reporter with Tel Aviv-based news channel i24, interviewed Israeli occupation force soldier David Ben Zion who made the same claim on October 10, 2023. He said: "They cut heads of children, they cut heads of women." 
                        </details></td>
    
                        <td>
                        <VideoPlayer videoLink="/files/i24NEWS_10Oct.mp4" externalURL="https://archive.ph/QeCXs"><a href="https://archive.ph/QeCXs" target="_blank" rel="noreferrer"><span class="play-arrow">▶</span> i24NEWS: ‘Horror scenes at kibbutz liberated from Hamas’</a></VideoPlayer><br />

                        <br /><a href="https://archive.ph/AhYIH" target="_blank" rel="noreferrer">Nicole Zedeck on X</a></td>
                    </tr>

  
                    <tr>
                        <td>
                            <div class="date">10 OCT</div>
                        </td>

                        <td>
                            Claim
                        </td>
                        

                        <td>Joe Biden claimed he saw ‘pictures of terrorists beheading babies’.</td>
                        
                        <td>
                        <VideoPlayer videoLink="/files/Fox_Biden_10Oct.mp4" externalURL="https://archive.ph/UN3Jd"><a href="https://archive.ph/UN3Jd" target="_blank" rel="noreferrer"><span class="play-arrow">▶</span> Fox News: ‘Biden making remarks on U.S. support for Israel’</a></VideoPlayer></td>
                    </tr>

 <tr>
  <td>
    <div class="date">10 OCT</div></td>

    <td>Claim</td>

  <td><details><summary>
    
  Nic Robertson of CNN recalls being brought to Kfar Aza to witness the brutality Hamas brought on the community<span class="expand-text"> + </span></summary>
  
  Nic Robertson of CNN recalls being brought to Kfar Aza to witness the brutality Hamas brought on the community. He describes it as “ISIS-style executions” where they were “cutting the heads off of people” including babies and killing their pets. One family hid their kids in a cupboard while they tried to distract the attackers. They were killed, but the distraction worked.</details></td>
  
  <td>
    <VideoPlayer videoLink="/files/CNN_NicRobertson_10Oct.mp4" externalURL="https://archive.ph/XRmh4"><a href="https://archive.ph/XRmh4" target="_blank" rel="noreferrer"><span class="play-arrow">▶</span> CNN: ‘IDF, women, toddlers, elderly “butchered” by Hamas in Kfar Aza’</a></VideoPlayer></td>
 </tr>

 <tr>
  <td>
    <div class="date">11 OCT</div></td>

    <td>Claim</td>

  <td>Sara Sidner of CNN.</td>

  <td>
    <VideoPlayer videoLink="/files/CNNTV_11Oct.mp4" externalURL="https://archive.ph/wpEIM"><a href="https://archive.ph/wpEIM" target="_blank" rel="noreferrer"><span class="play-arrow">▶</span> CNN: ‘Netanyahu’s office releases photos of “babies murdered and burned” by Hamas’</a></VideoPlayer></td>
 </tr>

 <tr>
  <td>
    <div class="date">11 OCT</div></td>

    <td>Debunked</td>
  
  <td>Sara Sidner of CNN retracts.</td>

  <td>
    <a href="https://archive.is/rom8W" target="_blank" rel="noreferrer">Sara Sidner on X</a></td>
 </tr>

 <tr>
  <td>
    <div class="date">11 OCT</div></td>

    <td>Debunked</td>

  <td>
  IDF says it won't back up its claim that Hamas decapitated babies in Israel because it is ‘disrespectful for the dead’.</td>

  <td>
    <a href="https://archive.ph/Otjey" target="_blank" rel="noreferrer">Business Insider: IDF says it won’t back up its claim that Hamas decapitated babies in Israel because it is ‘disrespectful for the dead’.</a></td>
 </tr>

 <tr>
  <td>
    
    <div class="date">11 OCT</div></td>

    <td>Claim</td>

  <td>
  Tal Heinrich spokesperson for the Israeli Prime Minister’s Office ‘confirmed’ soldiers on the ground had been dealing with babies who had been decapitated.</td>

  <td>
    <VideoPlayer videoLink="/files/LBC_11Oct.mp4" externalURL="https://archive.is/UwDCO"><a href="https://archive.is/UwDCO" target="_blank" rel="noreferrer"><span class="play-arrow">▶</span> LBC: ‘Toddlers, babies with their heads cut off’</a></VideoPlayer></td>
 </tr>

   <tr> 
    <td>
        <div class="date">11 OCT</div></td>

        <td>Debunked</td>

    <td>
        
    
        <details><summary> After an Israeli reserve soldier named David Ben Zion told a reporter Palestinian militants “cut [off] heads of babies,” Biden, Netanyahu, and the international media amplified the dubious claim<span class="expand-text"> + </span></summary>
    
    
    After an Israeli reserve soldier named David Ben Zion told a reporter Palestinian militants “cut [off] heads of babies,” Biden, Netanyahu, and the international media amplified the dubious claim. The Grayzone has identified Ben Zion as a fanatical settler leader who incited riots by demanding a Palestinian town be “wiped out”.</details></td>
    
    <td>
        <a class="media-source" href="https://archive.is/NcD6m" target="_blank" rel="noreferrer">Metro: ‘40 babies murdered by Hamas’</a></td>
   </tr>

   <tr>
   <td>
    
    <div class="date">12 OCT</div></td>

    <td>Claim????</td>

   <td>Jerusalem Post</td>
   
   <td>

    <a class="media-source" href="https://archive.ph/9c9L0" target="_blank" rel="noreferrer">The Jerusalem Post on X</a></td>
  </tr>

   <tr>
    <td>
        <div class="date">12 OCT</div></td>

<td>??</td>

    <td>
        
        ‘Israeli official says government cannot confirm babies were beheaded in Hamas attack’.</td>
    
    <td>
    
    <a class="media-source" href="https://archive.ph/S0ZA3" target="_blank" rel="noreferrer">CNN: ‘Israeli official says government cannot confirm babies were beheaded in Hamas attack’</a></td>
   </tr>

   <tr>
    <td>
        
        <div class="date">13 OCT</div></td>

        <td>???</td>

    <td>
        When journalists asked a spokesman for the Israeli military about the story, the reply was, “We cannot confirm but you can assume it happened.”</td>

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
