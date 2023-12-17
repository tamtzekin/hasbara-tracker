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
                <col style={{ width: '10%'}} />
                <col style={{ width: '10%'}} />
                {/* <col style={{ width: '5%'}} /> */}
                </colgroup>

                <tbody>
                    <tr>
                        <td><span class="claim-subheading">DATE</span><div class="date">10 OCT</div></td>
                        <td><details><summary>
                            
                        <span class="claim-subheading">CLAIM</span> 

                        Babies and toddlers were found with their “heads decapitated” in Kfar Aza<span class="expand-text">... more</span></summary><span class="claim-subheading">CLAIM</span>Babies and toddlers were found with their “heads decapitated” in Kfar Aza in southern Israel after Hamas’ attacks in the kibbutz over the weekend, a spokesperson for Israel's prime minister says. Nicole Zedeck, a reporter with Tel Aviv-based news channel i24 from her interview with Israeli reserve soldier David Ben Zion.</details></td>
    
                        <td><span class="claim-subheading">SOURCES</span>
                        
                        <VideoPlayer videoLink="/files/i24NEWS_10Oct.mp4" externalURL="https://archive.ph/QeCXs"><a href="https://archive.ph/QeCXs" target="_blank" rel="noreferrer"><span class="play-arrow">▶</span> i24NEWS: ‘Horror scenes at kibbutz liberated from Hamas’</a></VideoPlayer><br />

                        <br /><a href="https://archive.ph/AhYIH" target="_blank" rel="noreferrer">Nicole Zedeck on X</a></td>
                    </tr>

                    <tr>
                        <td>
                            <span class="claim-subheading">DATE</span>
                            <div class="date">10 OCT</div></td>
                        
                        <td><span class="claim-subheading">CLAIM</span> Joe Biden claimed he saw ‘pictures of terrorists beheading babies’.</td>
                        
                        <td>
                            <span class="claim-subheading">SOURCES</span>
                            
                        <VideoPlayer videoLink="/files/Fox_Biden_10Oct.mp4" externalURL="https://archive.ph/UN3Jd"><a href="https://archive.ph/UN3Jd" target="_blank" rel="noreferrer"><span class="play-arrow">▶</span> Fox News: ‘Biden making remarks on U.S. support for Israel’</a></VideoPlayer></td>
                    </tr>

 <tr>
  <td>
    <span class="claim-subheading">DATE</span>

    <div class="date">10 OCT</div></td>

  <td><details><summary>
    
    <span class="claim-subheading">CLAIM</span>
  
  Nic Robertson of CNN recalls being brought to Kfar Aza to witness the brutality Hamas brought on the community<span class="expand-text">... more</span></summary>
  
  <span class="claim-subheading">CLAIM</span>
  
  Nic Robertson of CNN recalls being brought to Kfar Aza to witness the brutality Hamas brought on the community. He describes it as “ISIS-style executions” where they were “cutting the heads off of people” including babies and killing their pets. One family hid their kids in a cupboard while they tried to distract the attackers. They were killed, but the distraction worked.</details></td>
  
  <td>
  <span class="claim-subheading">SOURCES</span>

    <VideoPlayer videoLink="/files/CNN_NicRobertson_10Oct.mp4" externalURL="https://archive.ph/XRmh4"><a href="https://archive.ph/XRmh4" target="_blank" rel="noreferrer"><span class="play-arrow">▶</span> CNN: ‘IDF, women, toddlers, elderly “butchered” by Hamas in Kfar Aza’</a></VideoPlayer></td>
  
  {/* <td><div class="claim">CLAIM</div></td> */}
 </tr>

 <tr>
  <td>
  <span class="claim-subheading">DATE</span>
    <div class="date">11 OCT</div></td>

  <td><span class="claim-subheading">CLAIM</span> Sara Sidner of CNN.</td>

  <td>
    
    <span class="claim-subheading">SOURCES</span>

    <VideoPlayer videoLink="/files/CNNTV_11Oct.mp4" externalURL="https://archive.ph/wpEIM"><a href="https://archive.ph/wpEIM" target="_blank" rel="noreferrer"><span class="play-arrow">▶</span> CNN: ‘Netanyahu’s office releases photos of “babies murdered and burned” by Hamas’</a></VideoPlayer></td>
 </tr>

 <tr>
  <td>
    
  <span class="claim-subheading">DATE</span>
    <div class="date">11 OCT</div></td>
  
  <td><span class="claim-subheading">CLAIM</span> Sara Sidner of CNN retracts.</td>

  <td>
    

    <span class="claim-subheading">SOURCES</span>
    <a href="https://archive.is/rom8W" target="_blank" rel="noreferrer">Sara Sidner on X</a></td>
 </tr>

 <tr>
  <td>
    
  <span class="claim-subheading">DATE</span>
    <div class="date">11 OCT</div></td>

  <td><span class="claim-subheading">DEBUNKED</span>

  IDF says it won't back up its claim that Hamas decapitated babies in Israel because it is ‘disrespectful for the dead’.</td>
  <td>
    
    <span class="claim-subheading">SOURCES</span>

    <a href="https://archive.ph/Otjey" target="_blank" rel="noreferrer">Business Insider: IDF says it won’t back up its claim that Hamas decapitated babies in Israel because it is ‘disrespectful for the dead’.</a></td>
  {/* <td><div class="debunked">DEBUNKED</div></td> */}
 </tr>

 <tr>
  <td>
    
    <span class="claim-subheading">DATE</span>
    <div class="date">11 OCT</div></td>

  <td><span class="claim-subheading">CLAIM</span>
  Tal Heinrich spokesperson for the Israeli Prime Minister’s Office ‘confirmed’ soldiers on the ground had been dealing with babies who had been decapitated.</td>

  <td>
    <span class="claim-subheading">SOURCES</span>
    <VideoPlayer videoLink="/files/LBC_11Oct.mp4" externalURL="https://archive.is/UwDCO"><a href="https://archive.is/UwDCO" target="_blank" rel="noreferrer"><span class="play-arrow">▶</span> LBC: ‘Toddlers, babies with their heads cut off’</a></VideoPlayer></td>
  {/* <td><div class="claim">CLAIM</div></td> */}
 </tr>

   <tr> 
    <td>
        <span class="claim-subheading">DATE</span>
        <div class="date">11 OCT</div></td>
    <td>
        
    
        <details><summary><span class="claim-subheading">DEBUNKED</span> After an Israeli reserve soldier named David Ben Zion told a reporter Palestinian militants “cut [off] heads of babies,” Biden, Netanyahu, and the international media amplified the dubious claim<span class="expand-text">... more</span></summary>
    
    <span class="claim-subheading">DEBUNKED</span>
    
    After an Israeli reserve soldier named David Ben Zion told a reporter Palestinian militants “cut [off] heads of babies,” Biden, Netanyahu, and the international media amplified the dubious claim. The Grayzone has identified Ben Zion as a fanatical settler leader who incited riots by demanding a Palestinian town be “wiped out”.</details></td>
    
    <td>
        <span class="claim-subheading">SOURCES</span>
        <a class="media-source" href="https://archive.is/NcD6m" target="_blank" rel="noreferrer">Metro: ‘40 BABIES MURDERED BY HAMAS’</a></td>
   </tr>

   <tr>
   <td>
    
    <span class="claim-subheading">DATE</span>
    <div class="date">12 OCT</div></td>

   <td><span class="claim-subheading">CLAIM</span> Jerusalem Post</td>
   
   <td>
    <span class="claim-subheading">SOURCES</span>

    <a class="media-source" href="https://archive.ph/9c9L0" target="_blank" rel="noreferrer">The Jerusalem Post on X</a></td>
  </tr>

   <tr>
    <td>
        <span class="claim-subheading">DATE</span>
        <div class="date">12 OCT</div></td>

    <td>
        <span class="claim-subheading">DEBUNKED</span>
        
        ‘Israeli official says government cannot confirm babies were beheaded in Hamas attack’.</td>
    
    <td><span class="claim-subheading">SOURCES</span>
    
    <a class="media-source" href="https://archive.ph/S0ZA3" target="_blank" rel="noreferrer">CNN: ‘Israeli official says government cannot confirm babies were beheaded in Hamas attack’</a></td>
   </tr>

   <tr>
    <td>
        
        <span class="claim-subheading">DATE</span>
        <div class="date">13 OCT</div></td>

    <td>
        <span class="claim-subheading">DEBUNKED</span>
        When journalists asked a spokesman for the Israeli military about the story, the reply was, “We cannot confirm but you can assume it happened.”</td>

    <td>
    <span class="claim-subheading">SOURCES</span>

        <a class="media-source" href="https://archive.ph/RNLTs" target="_blank" rel="noreferrer">Al Jazeera: ‘Watching the watchdogs: Babies and truth die together in Israel-Palestine’</a></td>
    {/* <td><div class="debunked">DEBUNKED</div></td> */}
   </tr>

        </tbody>
      </table>
  </span>
    </>
  );
};

export default ClaimA;
