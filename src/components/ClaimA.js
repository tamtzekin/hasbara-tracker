import logo from '../logo.svg';
import React from 'react';
import { Link } from 'react-router-dom';
import './ClaimPage.css';
import './Arrow.css';
import VideoPlayer from './VideoPlayer';

const ClaimA = () => {
  return (
    <>

      <Link to="/claims"><div className="arrow">⭪</div></Link>
      <h1 class="claim-heading">Claim: Forty beheaded babies</h1>

<span class="table-container">
      <table>
        <thead>
          <tr>
            <th>DATE</th>
            <th>DESCRIPTION</th>
            <th>SOURCE</th>
            <th>CLAIM / DEBUNKED</th>
          </tr>
        </thead>

        <tbody>
        <tr>
    <td><div class="date">OCT 10, 2023</div></td>
    <td>Babies and toddlers were found with their “heads decapitated” in Kfar Aza in southern Israel after Hamas’ attacks in the kibbutz over the weekend, a spokesperson for Israel's prime minister says. Nicole Zedeck, a reporter with Tel Aviv-based news channel i24 from her interview with Israeli reserve soldier David Ben Zion.</td>
    <td><VideoPlayer videoLink="../../public/files/i24NEWS_10Oct.mp4"><a href="#">i24NEWS: ‘HORROR SCENES AT KIBBUTZ LIBERATED FROM HAMAS’</a></VideoPlayer><br />
    <br />

    <a href="#">Nicole Zedeck on X</a></td>
    <td><div class="claim">CLAIM</div></td>
  </tr>

 <tr>
  <td><div class="date">OCT 10, 2023</div></td>
  <td>Joe Biden claimed he saw ‘pictures of terrorists beheading babies’.</td>
<td><VideoPlayer videoLink="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"><a href="#">Fox News: ‘BIDEN MAKING REMARKS ON U.S. SUPPORT FOR ISRAEL’</a></VideoPlayer></td>
  <td><div class="claim">CLAIM</div></td>
 </tr>

 <tr>
  <td><div class="date">OCT 10, 2023</div></td>
  <td>Nic Robertson of CNN: Nic Robertson recalls being brought to Kfar Aza to witness the brutality Hamas brought on the community. He describes it as “ISIS-style executions” where they were “cutting the heads off of people” including babies and killing their pets. One family hid their kids in a cupboard while they tried to distract the attackers. They were killed, but the distraction worked.</td>
  <td><VideoPlayer videoLink="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"><a href="#">CNN: ‘IDF, WOMEN, TODDLERS, ELDERLY “BUTCHERED” BY HAMAS IN KFAR AZA’</a></VideoPlayer></td>
  <td><div class="claim">CLAIM</div></td>
 </tr>

 <tr>
  <td><div class="date">OCT 11, 2023</div></td>
  <td>Sara Sidner of CNN.</td>
  <td><VideoPlayer videoLink="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"><a href="#">CNN: ‘NETANHAYU’S OFFICE RELEASES PHOTOS OF “BABIES MURDERED AND BURNED” BY HAMAS’</a></VideoPlayer></td>
  <td><div class="claim">CLAIM</div></td>
 </tr>

 <tr>
  <td><div class="date">OCT 11, 2023</div></td>
  <td>Sara Sidner of CNN retracts.</td>
  <td><a href="#">Sara Sidner on X</a></td>
  <td><div class="debunked">DEBUNKED</div></td>
 </tr>

 <tr>
  <td><div class="date">OCT 11, 2023</div></td>
  <td>Business Insider:.</td>
  <td><VideoPlayer videoLink="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"><a href="#">Business Insider: IDF says it won’t back up its claim that Hamas decapitated babies in Israel because it is ‘disrespectful for the dead’.</a></VideoPlayer></td>
  <td><div class="debunked">DEBUNKED</div></td>
 </tr>

 <tr>
  <td><div class="date">OCT 11, 2023</div></td>
  <td>Tal Heinrich spokesperson for the Israeli Prime Minister’s Office ‘confirmed’ soldiers on the ground had been dealing with babies who had been decapitated to LBC in the UK</td>
  <td><VideoPlayer videoLink="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"><a href="#">LLBC: ‘Toddlers, babies with their heads cut off’</a></VideoPlayer></td>
  <td><div class="claim">CLAIM</div></td>
 </tr>

   <tr>
    <td><div class="date">OCT 11, 2023</div></td>
    <td>After an Israeli reserve soldier named David Ben Zion told a reporter Palestinian militants “cut [off] heads of babies,” Biden, Netanyahu, and the international media amplified the dubious claim. The Grayzone has identified Ben Zion as a fanatical settler leader who incited riots by demanding a Palestinian town be “wiped out”.</td>
    <td><a href="#">Metro: ‘40 BABIES MURDERED BY HAMAS’</a></td>
    <td><div class="contex">CONTEXT</div><br /><br /><div class="debunked">DEBUNKED</div></td>
   </tr>


   <tr>
   <td><div class="date">OCT 12, 2023</div></td>
   <td>Jerusalem Post</td>
   <td><a href="#">The Jerusalem Post on X</a></td>
   <td><div class="claim">CLAIM</div></td>
  </tr>

   <tr>
    <td><div class="date">OCT 12, 2023</div></td>
    <td>CNN: ‘Israeli official says government cannot confirm babies were beheaded in Hamas attack’</td>
    <td><a href="#">CNN: ‘Israeli official says government cannot confirm babies were beheaded in Hamas attack’</a></td>
    <td><div class="debunked">DEBUNKED</div></td>
   </tr>

   <tr>
    <td><div class="date">OCT 13, 2023</div></td>
    <td>Al Jazeera: When journalists asked a spokesman for the Israeli military about the story, the reply was, “We cannot confirm but you can assume it happened.”</td>
    <td><a href="#">Al Jazeera: ‘Watching the watchdogs: Babies and truth die together in Israel-Palestine’</a></td>
    <td><div class="debunked">DEBUNKED</div></td>
   </tr>

        </tbody>
      </table>
  </span>
    </>
  );
};

export default ClaimA;
