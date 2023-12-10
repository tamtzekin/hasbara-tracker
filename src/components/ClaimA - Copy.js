import logo from '../logo.svg';
import React from 'react';
import { Link } from 'react-router-dom';
import './ClaimPage.css';

const ClaimA = () => {
  return (
    <>

<Link to="/claims"><span className="arrow">⭪</span></Link>
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
      
      {/* <tr>
        <td>DATE</td>
        <td>DESCRIPTION</td>
        <td>SOURCE</td>
        <td>CLAIM / DEBUNKED</td>
      </tr> */}
    
       <tr>
        <td><div class="date">OCT 10, 2023</div></td>
        <td>Babies and toddlers were found with their “heads decapitated” in Kfar Aza in southern Israel after Hamas’ attacks in the kibbutz over the weekend, a spokesperson for Israel's prime minister says. Nicole Zedeck, a reporter with Tel Aviv-based news channel i24 from her interview with Israeli reserve soldier David Ben Zion.</td>
        <td>
        <a href="#" onClick={(event) => openModal(event, '../files/i24NEWS_10Oct.mp4', 'video-link')}>i24NEWS: ‘HORROR SCENES AT KIBBUTZ LIBERATED FROM HAMAS’</a><br />
        <br />
        
        <a href="#" onClick="openModal(event, '../files/X_NicoleZedeck_10Oct.png', 'tweet-link')">Nicole Zedeck on X</a></td>
        <td><div class="claim">CLAIM</div></td>
      </tr>
    
     <tr>
      <td><div class="date">OCT 10, 2023</div></td>
      <td>Joe Biden claimed he saw ‘pictures of terrorists beheading babies’.</td>
    <td><a href="#" onClick="openModal(event, '../files/Fox_Biden_10Oct.mp4', 'video-link')">Fox News: ‘BIDEN MAKING REMARKS ON U.S. SUPPORT FOR ISRAEL’</a></td>
      <td><div class="claim">CLAIM</div></td>
     </tr>
    
     <tr>
      <td><div class="date">OCT 10, 2023</div></td>
      <td>Nic Robertson of CNN: Nic Robertson recalls being brought to Kfar Aza to witness the brutality Hamas brought on the community. He describes it as “ISIS-style executions” where they were “cutting the heads off of people” including babies and killing their pets. One family hid their kids in a cupboard while they tried to distract the attackers. They were killed, but the distraction worked.</td>
      <td><a href="#" onClick="openModal(event, './files/CNN_NicRobertson_10Oct.mp4', 'video-link')">CNN: ‘IDF, WOMEN, TODDLERS, ELDERLY “BUTCHERED” BY HAMAS IN KFAR AZA’</a></td>
      <td><div class="claim">CLAIM</div></td>
     </tr>
    
     <tr>
      <td><div class="date">OCT 11, 2023</div></td>
      <td>Sara Sidner of CNN.</td>
      <td><a href="#" onclick="openModal(event, '../files/CNNTV_12Oct.mp4', 'video-link')">CNN: ‘NETANHAYU’S OFFICE RELEASES PHOTOS OF “BABIES MURDERED AND BURNED” BY HAMAS’</a></td>
      <td><div class="claim">CLAIM</div></td>
     </tr>
    
     <tr>
      <td><div class="date">OCT 11, 2023</div></td>
      <td>Sara Sidner of CNN retracts.</td>
      <td><a href="#" onclick="openModal(event, '../files/X_SaraSidner_12Oct.png', 'tweet-link')">Sara Sidner on X</a></td>
      <td><div class="debunked">DEBUNKED</div></td>
     </tr>
    
     <tr>
      <td><div class="date">OCT 11, 2023</div></td>
      <td>Business Insider: IDF says it won’t back up its claim that Hamas decapitated babies in Israel because it is ‘disrespectful for the dead’.</td>
      <td><a href="#" onclick="openModal(event, '../files/BusinessInsider_11Oct.png', 'img-link')">Business Insider: ‘IDF says it won't back up its claim that Hamas decapitated babies in Israel because it is 'disrespectful for the dead'’</a></td>
      <td><div class="debunked">DEBUNKED</div></td>
     </tr>
    
     <tr>
      <td><div class="date">OCT 11, 2023</div></td>
      <td>Tal Heinrich spokesperson for the Israeli Prime Minister’s Office ‘confirmed’ soldiers on the ground had been dealing with babies who had been decapitated to LBC in the UK</td>
      <td><a href="#" onclick="openModal(event, '../files/LBC_11Oct.mp4', 'video-link')">LBC: ‘Toddlers, babies with their heads cut off’</a></td>
      <td><div class="claim">CLAIM</div></td>
     </tr>
    
       <tr>
        <td><div class="date">OCT 11, 2023</div></td>
        <td>After an Israeli reserve soldier named David Ben Zion told a reporter Palestinian militants “cut [off] heads of babies,” Biden, Netanyahu, and the international media amplified the dubious claim. The Grayzone has identified Ben Zion as a fanatical settler leader who incited riots by demanding a Palestinian town be “wiped out”.</td>
        <td><a href="#" onclick="openModal(event,'../files/Metro_11Oct2023.webp', 'img-link')">Metro: ‘40 BABIES MURDERED BY HAMAS’</a></td>
        <td><div class="contex">CONTEXT</div><br /><br /><div class="debunked">DEBUNKED</div></td>
       </tr>
    
    
       <tr>
       <td><div class="date">OCT 12, 2023</div></td>
       <td>Jerusalem Post</td>
       <td><a href="#" onclick="openModal(event, '../files/JersualemPost_12Oct.png', 'tweet-link')">The Jerusalem Post on X</a></td>
       <td><div class="claim">CLAIM</div></td>
      </tr>
    
       <tr>
        <td><div class="date">OCT 12, 2023</div></td>
        <td>CNN official retraction.</td>
        <td><a href="#" onclick="openModal(event, '../files/CNN_12Oct.png', 'img-link')">CNN: ‘Israeli official says government cannot confirm babies were beheaded in Hamas attack’</a></td>
        <td><div class="debunked">DEBUNKED</div></td>
       </tr>
    
       <tr>
        <td><div class="date">OCT 13, 2023</div></td>
        <td>Al Jazeera: When journalists asked a spokesman for the Israeli military about the story, the reply was, “We cannot confirm but you can assume it happened.”</td>
        <td><a href="#" onclick="openModal(event, '../files/AlJazeera_13Oct.png', 'img-link')">Al Jazeera: ‘Watching the watchdogs: Babies and truth die together in Israel-Palestine’</a></td>
        <td><div class="debunked">DEBUNKED</div></td>
       </tr>
    
        </tbody>
      </table>
  </span>

  
          {/* Modal overlay */}
          <div id="videoModal" className="modal-overlay">
        {/* Modal content */}
        <div className="modal-content">
          <span className="close-btn" onClick={closeModal}>&times;</span>
          {/* Embed your video here */}
          <iframe title="video" width="100%" height="100%" src="" frameBorder="0" allowFullScreen></iframe>
        </div>
      </div>

    </>
  );

  function openModal(event, videoLink, fileType) {
    const modalContent = document.querySelector('#videoModal .modal-content');
    modalContent.className = 'modal-content ' + fileType;

    // Set the video source
    document.querySelector('#videoModal iframe').src = videoLink;

    // Display the modal
    document.getElementById('videoModal').style.display = 'flex';

    // Lock the main page scrollbar when modal is open
    document.body.classList.add('modal-open');

    // Prevents page from bumping to top when modal is open
    event.preventDefault();
  }

  function closeModal() {
    document.querySelector('#videoModal iframe').src = '';
    document.getElementById('videoModal').style.display = 'none';

    // Unlock page scrollbar when modal is closed
    document.body.classList.remove('modal-open');
  }

};

export default ClaimA;
