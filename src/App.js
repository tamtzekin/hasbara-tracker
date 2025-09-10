import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './contexts/AuthContext';

import './App.css';

import Homepage from './components/Homepage';
import About from './components/About';
import Tracker from './components/Tracker';
import VideoPlayer from './components/VideoPlayer';
import ScrollToTop from './components/utils/ScrollToTop';
import VolunteerForm from './components/VolunteerForm';
import SubmitClaimForm from './components/SubmitClaimForm';
import AdminClaimForm from './components/AdminClaimForm';
import EditableClaimTracker from './components/EditableClaimTracker';
import ContactForm from './components/ContactForm';
import MailSignUpForm from './components/MailSignUpForm';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';
import VolunteersPage from './components/VolunteersPage';
import StatusPage from './components/StatusPage';
import ProtectedRoute from './components/ProtectedRoute';

import ClaimFortyBeheadedBabies from './components/ClaimFortyBeheadedBabies';
import ClaimAlAhliAttacked from './components/ClaimAlAhliAttacked';
import ClaimAlShifaFuel from './components/ClaimAlShifaFuel';
import ClaimMakeup from './components/ClaimMakeup';
import ClaimHamasChemicalWeapons from './components/ClaimHamasChemicalWeapons';
import ClaimIsraelDeniesChurchKilling from './components/ClaimIsraelDeniesChurchKilling';
import ClaimIsraelHelpsElderlyMan from './components/ClaimIsraelHelpsElderlyMan';
import ClaimCaptivesStripped from './components/ClaimCaptivesStripped';
import Claim from './components/Claim';
import ClaimNewClaim from './components/ClaimNewClaim';
import ClaimChurchKillingDenial from './components/ClaimChurchKillingDenial';
import ClaimElderlyManHelp from './components/ClaimElderlyManHelp';
import ClaimNakedCaptivesWeather from './components/ClaimNakedCaptivesWeather';
import ClaimIsraeliStateDeniesKillingMotherAndDaughterSeekingRefugeInGazasHolyFamilyParish from './components/ClaimIsraeliStateDeniesKillingMotherAndDaughterSeekingRefugeInGazasHolyFamilyParish';
import ClaimIsraeliSoldierHelpsElderlyPalestinianManInSafeCorridor from './components/ClaimIsraeliSoldierHelpsElderlyPalestinianManInSafeCorridor';
import ClaimPalestinianCaptivesStrippedDownNakedBecauseOfWarmWeatherInTheMiddleEastSaysMarkRegev from './components/ClaimPalestinianCaptivesStrippedDownNakedBecauseOfWarmWeatherInTheMiddleEastSaysMarkRegev';
import ClaimNewClaimTest from './components/ClaimNewClaimTest';
import ClaimIsaacHerzogSaysMeinKampfFoundInChildsBedroom from './components/ClaimIsaacHerzogSaysMeinKampfFoundInChildsBedroom';
import ClaimBloodFoundInChildsBedroomImplyingMassacre from './components/ClaimBloodFoundInChildsBedroomImplyingMassacre';
import ClaimIsraelsAmbassadorToTheUkSaidThereIsASafeZoneForPalestiniansCalledMawasi from './components/ClaimIsraelsAmbassadorToTheUkSaidThereIsASafeZoneForPalestiniansCalledMawasi';
import ClaimBulletsInBabyCribDuringElonMusksVisit from './components/ClaimBulletsInBabyCribDuringElonMusksVisit';
import ClaimFoxNewsShowingIsraeliSoldiersArrestingHamasMember from './components/ClaimFoxNewsShowingIsraeliSoldiersArrestingHamasMember';
import ClaimHamasMembersRelinquishingTheirWeaponsButIofPublishedTwoVideosShowingTwoDifferentTakes from './components/ClaimHamasMembersRelinquishingTheirWeaponsButIofPublishedTwoVideosShowingTwoDifferentTakes';
import ClaimIsraeliStateFindsDocumentsProvingHamasIsUsingMosquesForTerroristPurposes from './components/ClaimIsraeliStateFindsDocumentsProvingHamasIsUsingMosquesForTerroristPurposes';
import ClaimHamasTunnelFoundAtTheQatariHospital from './components/ClaimHamasTunnelFoundAtTheQatariHospital';
import ClaimIsraelDeniesUsingWhitePhosphorusMunitionsInGaza from './components/ClaimIsraelDeniesUsingWhitePhosphorusMunitionsInGaza';
import ClaimTheHostagesWereNotHeldInReasonableConditions from './components/ClaimTheHostagesWereNotHeldInReasonableConditions';
import ClaimProtestorsInTorontoTargetedMtSinaiHospital from './components/ClaimProtestorsInTorontoTargetedMtSinaiHospital';
import ClaimIofClaimingToHelpPalestinianEvacueesByGivingThemWater from './components/ClaimIofClaimingToHelpPalestinianEvacueesByGivingThemWater';
import ClaimTheIsraeliRegimeIsntSeekingToDisplacePalestiniansInGaza from './components/ClaimTheIsraeliRegimeIsntSeekingToDisplacePalestiniansInGaza';
import ClaimIsraeliStateDeniesFamineInGaza from './components/ClaimIsraeliStateDeniesFamineInGaza';
import Claim1400RevisionsOfNumberOfIsraelisKilled from './components/Claim1400RevisionsOfNumberOfIsraelisKilled';
import ClaimBabiesHungOnClotheslines from './components/ClaimBabiesHungOnClotheslines';
import ClaimBabyBakedInOvenAndorMicrowaved from './components/ClaimBabyBakedInOvenAndorMicrowaved';
import ClaimFetusRemovedFromPregnantWoman from './components/ClaimFetusRemovedFromPregnantWoman';
import ClaimHamasLeftAnIsisFlagBehind from './components/ClaimHamasLeftAnIsisFlagBehind';
import ClaimHostageGaveBirthInCaptivity from './components/ClaimHostageGaveBirthInCaptivity';
import ClaimPalestinianFightersBurnedBodiesOnOct7 from './components/ClaimPalestinianFightersBurnedBodiesOnOct7';
import ClaimHamascomIsAnOfficialHamasWebsiteIsADebunkedCounterfeitWebsite from './components/ClaimHamascomIsAnOfficialHamasWebsiteIsADebunkedCounterfeitWebsite';
import ClaimIsraelDeniesOrderingWorldHealthOrganisationRemoveMedicalSuppliesFromItsWarehouseInSouthGaza from './components/ClaimIsraelDeniesOrderingWorldHealthOrganisationRemoveMedicalSuppliesFromItsWarehouseInSouthGaza';
import ClaimIsraelSaidRedCrossWouldReturnToAlnasrHospitalToEvacuateBabiesInIcu from './components/ClaimIsraelSaidRedCrossWouldReturnToAlnasrHospitalToEvacuateBabiesInIcu';
import ClaimIofAndIsraeliStateClaimTheyAreNotBombingOrTargetingHospitalsForensicArchitectureConcludesOtherwise from './components/ClaimIofAndIsraeliStateClaimTheyAreNotBombingOrTargetingHospitalsForensicArchitectureConcludesOtherwise';
import ClaimIofFindWeaponsBehindMriScannerAtAlshifaHospital from './components/ClaimIofFindWeaponsBehindMriScannerAtAlshifaHospital';
import ClaimIsraeliStateDeniesStrikingAlshifaHospital from './components/ClaimIsraeliStateDeniesStrikingAlshifaHospital';
import ClaimNurseAtAlshifaHospitalBlamingHamas from './components/ClaimNurseAtAlshifaHospitalBlamingHamas';
import ClaimHamasDruggedHostagesWithClonazepamBeforeReleasingThemToMakeThemSeemHappy from './components/ClaimHamasDruggedHostagesWithClonazepamBeforeReleasingThemToMakeThemSeemHappy';
import ClaimTheIcjThrewOutSouthAfricasCase from './components/ClaimTheIcjThrewOutSouthAfricasCase';
import ClaimGazaHasElectricityBecausePalestiniansAreUsingPhones from './components/ClaimGazaHasElectricityBecausePalestiniansAreUsingPhones';
import ClaimIsraeliGovernmentSpokespersonSaysExchangedPalestinianPrisonersHaveBloodOnTheirHands from './components/ClaimIsraeliGovernmentSpokespersonSaysExchangedPalestinianPrisonersHaveBloodOnTheirHands';
import ClaimReleasedPalestinianPrisonerIsraGabasWasAttemptedSuicideBomber from './components/ClaimReleasedPalestinianPrisonerIsraGabasWasAttemptedSuicideBomber';
import ClaimThereAreNoChurchesInGaza from './components/ClaimThereAreNoChurchesInGaza';
import ClaimHamasPlannedToUseChemicalWeaponsOn7October from './components/ClaimHamasPlannedToUseChemicalWeaponsOn7October';
import ClaimHamasBurntChildrenHostagesWithExhaustPipes from './components/ClaimHamasBurntChildrenHostagesWithExhaustPipes';
import ClaimHamasInVideoSaidPutHerBackShesForRape from './components/ClaimHamasInVideoSaidPutHerBackShesForRape';
import ClaimHamasResponsibleFor260DeathsInSurpriseAttackOnSupernovaFestival from './components/ClaimHamasResponsibleFor260DeathsInSurpriseAttackOnSupernovaFestival';
import ClaimNicoAstrogaClaimsHeWasASurvivorOf7OctOperationAtSupernovaFestivalSays29OfHisFriendsMurderedWasntEvenThere from './components/ClaimNicoAstrogaClaimsHeWasASurvivorOf7OctOperationAtSupernovaFestivalSays29OfHisFriendsMurderedWasntEvenThere';
import ClaimPalestinianFightersRapedBabies from './components/ClaimPalestinianFightersRapedBabies';
import ClaimPalestinianFightersCutOffBreastsOfWoman from './components/ClaimPalestinianFightersCutOffBreastsOfWoman';
import ClaimIofGotConfessionOfAhmadKahalotTheDirectorOfKamalAdwanHospitalInJabaliyaThatHesASeniorHamasMember from './components/ClaimIofGotConfessionOfAhmadKahalotTheDirectorOfKamalAdwanHospitalInJabaliyaThatHesASeniorHamasMember';
import ClaimHamasBrokeTheCeasefire from './components/ClaimHamasBrokeTheCeasefire';
import ClaimHamasHasRejectedOffersForACeasefire from './components/ClaimHamasHasRejectedOffersForACeasefire';
import ClaimGivingPalestiniansASafePassageHumanitarianCorridorToEvacuate from './components/ClaimGivingPalestiniansASafePassageHumanitarianCorridorToEvacuate';
import ClaimIsraeliPoliticianAndFormerPmNaftaliBennettClaimsSonOfOneOfHamasLeadersIsmailHaniyehIsBuyingExpensiveJewelleryInQatarWhileHisBrothersAndSistersAreSuffering from './components/ClaimIsraeliPoliticianAndFormerPmNaftaliBennettClaimsSonOfOneOfHamasLeadersIsmailHaniyehIsBuyingExpensiveJewelleryInQatarWhileHisBrothersAndSistersAreSuffering';
import ClaimIsraeliStateClaimsPalestiniansBuriedMassGravesFoundAtNasserHospital from './components/ClaimIsraeliStateClaimsPalestiniansBuriedMassGravesFoundAtNasserHospital';
import ClaimIsraelBringingMedicalSuppliesAndIncubatorsToHelpAlreadyIncubatedBabiesToAlshifa from './components/ClaimIsraelBringingMedicalSuppliesAndIncubatorsToHelpAlreadyIncubatedBabiesToAlshifa';
import ClaimIsraelBroughtMedicalSupplyBoxesToAlshifaHospital from './components/ClaimIsraelBroughtMedicalSupplyBoxesToAlshifaHospital';
import ClaimHamasHidWeaponsInIncubatorsInNicuAtKamalAdwanHospital from './components/ClaimHamasHidWeaponsInIncubatorsInNicuAtKamalAdwanHospital';
import ClaimHamasOperativesDiscussingPalestinianIslamicJihadsResponsibilityForTheAlahliArabBaptistHospitalMassacre from './components/ClaimHamasOperativesDiscussingPalestinianIslamicJihadsResponsibilityForTheAlahliArabBaptistHospitalMassacre';
import ClaimIsraeliSoldierClaimsArabicCalendarIsHamasGuardListAtAlrantisiChildrensHospital from './components/ClaimIsraeliSoldierClaimsArabicCalendarIsHamasGuardListAtAlrantisiChildrensHospital';
import ClaimIsraeliForcesSayTheyDoNotTargetPlacesWhereTheHostagesMayBe from './components/ClaimIsraeliForcesSayTheyDoNotTargetPlacesWhereTheHostagesMayBe';
import ClaimIsraeliOfficialsSaidHostageEmilyHandWasKilled from './components/ClaimIsraeliOfficialsSaidHostageEmilyHandWasKilled';
import ClaimTheIsraeliStateClaimsItIsTakingImmediateAndEffectiveMeasuresToProvideHumanitarianAssistanceAfterIcjProvisionalMeasuresRuling from './components/ClaimTheIsraeliStateClaimsItIsTakingImmediateAndEffectiveMeasuresToProvideHumanitarianAssistanceAfterIcjProvisionalMeasuresRuling';
import ClaimIofClaimsItFoundMohammadDeifsPalestinianIdentityCardSeizedAtHisSistersHouse from './components/ClaimIofClaimsItFoundMohammadDeifsPalestinianIdentityCardSeizedAtHisSistersHouse';
import ClaimIsraelDeniesAttackOnUnTrainingCentreAndRefugeInKhanYounisGaza from './components/ClaimIsraelDeniesAttackOnUnTrainingCentreAndRefugeInKhanYounisGaza';
import ClaimBbcReportsReleasedPalestinianPrisonerAsSayingOnlyHamasCared from './components/ClaimBbcReportsReleasedPalestinianPrisonerAsSayingOnlyHamasCared';
import ClaimIsraeliStateDeniesInvolvementInTheKillingOfSixyearoldPalestinianGirlHindRajab from './components/ClaimIsraeliStateDeniesInvolvementInTheKillingOfSixyearoldPalestinianGirlHindRajab';
import ClaimPalestinianCorpseInBodyBagWasStaged from './components/ClaimPalestinianCorpseInBodyBagWasStaged';
import ClaimTheHouthiledEmbargoOnShippingInTheRedSeaIsWhatIsHarmingPalestiniansAndImpactingTheEntryOfHumanitarianAidIntoGaza from './components/ClaimTheHouthiledEmbargoOnShippingInTheRedSeaIsWhatIsHarmingPalestiniansAndImpactingTheEntryOfHumanitarianAidIntoGaza';
import ClaimTopSecretDocumentsFoundOnPalestinianFighters from './components/ClaimTopSecretDocumentsFoundOnPalestinianFighters';
import ClaimIofFindsSniperRifleInTeddyBearWeaponsInUnrwaBagsTunnelUnderClassroom from './components/ClaimIofFindsSniperRifleInTeddyBearWeaponsInUnrwaBagsTunnelUnderClassroom';
import ClaimTheIsraeliStateIsFloodingUndergroundTunnelsWhichItCallsTerroristInfrastructure from './components/ClaimTheIsraeliStateIsFloodingUndergroundTunnelsWhichItCallsTerroristInfrastructure';
import ClaimIsraeliStateDestroysGraveyardClaimingHamasTunnelUnderneathIt from './components/ClaimIsraeliStateDestroysGraveyardClaimingHamasTunnelUnderneathIt';
import ClaimUnrwaIsInfiltratedByHamas from './components/ClaimUnrwaIsInfiltratedByHamas';
import ClaimIofDogsAttackHamas from './components/ClaimIofDogsAttackHamas';
import ClaimIsraelClaimsPalestinianCaptivesItRoundsUpAreHamas from './components/ClaimIsraelClaimsPalestinianCaptivesItRoundsUpAreHamas';
import ClaimThereWasACeasefireOn6October2023 from './components/ClaimThereWasACeasefireOn6October2023';
import ClaimIofFindsHostagePhotosOnLaptopAtAlshifaHospital from './components/ClaimIofFindsHostagePhotosOnLaptopAtAlshifaHospital';
import ClaimHamasStealingFlourAndFoodFromUnrwa from './components/ClaimHamasStealingFlourAndFoodFromUnrwa';
import ClaimIsraeliStateDeniesTargetingJournalistsInGaza from './components/ClaimIsraeliStateDeniesTargetingJournalistsInGaza';
import ClaimIsraeliStateAndAipacSayTheArtists4ceasefireA4cLogoIsRepresentsRamallahAttack from './components/ClaimIsraeliStateAndAipacSayTheArtists4ceasefireA4cLogoIsRepresentsRamallahAttack';
import ClaimWeaponsConfiscatedDuringTheIofs3dayOffensiveInJeninRefugeeCampTheItemsInThePhotoAreMostlyChildrensToys from './components/ClaimWeaponsConfiscatedDuringTheIofs3dayOffensiveInJeninRefugeeCampTheItemsInThePhotoAreMostlyChildrensToys';
import ClaimDeadPalestinianChildrenAreDolls from './components/ClaimDeadPalestinianChildrenAreDolls';
import ClaimKeirStarmerSaysIsraelHasTheRightToCutOffPowerAndWater from './components/ClaimKeirStarmerSaysIsraelHasTheRightToCutOffPowerAndWater';
import ClaimSexualViolenceUsedByPalestinianResistanceOn7October from './components/ClaimSexualViolenceUsedByPalestinianResistanceOn7October';
import ClaimThePropalestineStudentEncampmentsAreAnOrganisedCellFundedByForeignStates from './components/ClaimThePropalestineStudentEncampmentsAreAnOrganisedCellFundedByForeignStates';
import ClaimHarvardHatesJewsBannerFlownByPlaneAcrossCampusByPalestineActivists from './components/ClaimHarvardHatesJewsBannerFlownByPlaneAcrossCampusByPalestineActivists';
import ClaimThereIsNoLimitToTheAmountOfAidThatCanBeFacilitatedIntoGaza from './components/ClaimThereIsNoLimitToTheAmountOfAidThatCanBeFacilitatedIntoGaza';
import ClaimIsraelDetainsTerroristsInGazaStripsThemDownToTheirClothes from './components/ClaimIsraelDetainsTerroristsInGazaStripsThemDownToTheirClothes';
import Claim1TestClaim from './components/Claim1TestClaim';


const App = () => {
    return (
    <>
    <HelmetProvider>
        <AuthProvider>
            <Router>
                <VideoPlayer />
                <ScrollToTop />
                <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/submit-claim" element={<SubmitClaimForm />} />
                <Route path="/login" element={<Login />} />
                <Route path="/claim-editor" element={
                    <ProtectedRoute allowedPermissions={['claim_editor']}>
                        <EditableClaimTracker />
                    </ProtectedRoute>
                } />
                <Route path="/admin" element={
                    <ProtectedRoute requireAdmin={true}>
                        <AdminPanel />
                    </ProtectedRoute>
                } />
                <Route path="/volunteers" element={
                    <ProtectedRoute requireAdmin={true}>
                        <VolunteersPage />
                    </ProtectedRoute>
                } />
                <Route path="/status" element={
                    <ProtectedRoute requireAdmin={true}>
                        <StatusPage />
                    </ProtectedRoute>
                } />
                <Route path="/about" element={<About />} />
                <Route path="/tracker" element={<Tracker />} />
                <Route path="/volunteer" element={<VolunteerForm />} />
                <Route path="/contact" element={<ContactForm />} />
                <Route path="/sign-up" element={<MailSignUpForm />} />

                {/* Individual claim pages */}
                {/* Short URLs for main claims */}
                <Route path="/church" element={<ClaimIsraelDeniesChurchKilling />} />
                <Route path="/captives" element={<ClaimCaptivesStripped />} />
                <Route path="/elderly" element={<ClaimIsraelHelpsElderlyMan />} />
                
                {/* Other claim routes */}
                <Route path="/forty-beheaded-babies" element={<ClaimFortyBeheadedBabies />} />
                <Route path="/al-ahli-attacked" element={<ClaimAlAhliAttacked />} />
                <Route path="/al-shifa-fuel" element={<ClaimAlShifaFuel />} />
                <Route path="/makeup" element={<ClaimMakeup />} />
                <Route path="/hamas-chemical-weapons" element={<ClaimHamasChemicalWeapons />} />
                
                {/* Keep long URLs for backward compatibility */}
                <Route path="/israel-denies-church-killing" element={<ClaimIsraelDeniesChurchKilling />} />
                <Route path="/captives-stripped" element={<ClaimCaptivesStripped />} />
                <Route path="/israel-helps-elderly-man" element={<ClaimIsraelHelpsElderlyMan />} />
                <Route path="/1-test-claim" element={<Claim1TestClaim />} />
                <Route path="/israel-detains-terrorists" element={<ClaimIsraelDetainsTerroristsInGazaStripsThemDownToTheirClothes />} />
                <Route path="/there-no-limit" element={<ClaimThereIsNoLimitToTheAmountOfAidThatCanBeFacilitatedIntoGaza />} />
                <Route path="/harvard-hates-jews" element={<ClaimHarvardHatesJewsBannerFlownByPlaneAcrossCampusByPalestineActivists />} />
                <Route path="/pro-palestine-student-encampments" element={<ClaimThePropalestineStudentEncampmentsAreAnOrganisedCellFundedByForeignStates />} />
                <Route path="/sexual-violence-used" element={<ClaimSexualViolenceUsedByPalestinianResistanceOn7October />} />
                <Route path="/keir-starmer-says" element={<ClaimKeirStarmerSaysIsraelHasTheRightToCutOffPowerAndWater />} />
                <Route path="/dead-palestinian-children" element={<ClaimDeadPalestinianChildrenAreDolls />} />
                <Route path="/weapons-confiscated-during" element={<ClaimWeaponsConfiscatedDuringTheIofs3dayOffensiveInJeninRefugeeCampTheItemsInThePhotoAreMostlyChildrensToys />} />
                <Route path="/israeli-state-aipac" element={<ClaimIsraeliStateAndAipacSayTheArtists4ceasefireA4cLogoIsRepresentsRamallahAttack />} />
                <Route path="/israeli-state-denies" element={<ClaimIsraeliStateDeniesTargetingJournalistsInGaza />} />
                <Route path="/hamas-stealing-flour" element={<ClaimHamasStealingFlourAndFoodFromUnrwa />} />
                <Route path="/iof-finds-hostage" element={<ClaimIofFindsHostagePhotosOnLaptopAtAlshifaHospital />} />
                <Route path="/there-ceasefire-6" element={<ClaimThereWasACeasefireOn6October2023 />} />
                <Route path="/israel-claims-palestinian" element={<ClaimIsraelClaimsPalestinianCaptivesItRoundsUpAreHamas />} />
                <Route path="/iof-dogs-attack" element={<ClaimIofDogsAttackHamas />} />
                <Route path="/unrwa-infiltrated-hamas" element={<ClaimUnrwaIsInfiltratedByHamas />} />
                <Route path="/israeli-state-destroys" element={<ClaimIsraeliStateDestroysGraveyardClaimingHamasTunnelUnderneathIt />} />
                <Route path="/israeli-state-flooding" element={<ClaimTheIsraeliStateIsFloodingUndergroundTunnelsWhichItCallsTerroristInfrastructure />} />
                <Route path="/iof-finds-sniper" element={<ClaimIofFindsSniperRifleInTeddyBearWeaponsInUnrwaBagsTunnelUnderClassroom />} />
                <Route path="/top-secret-documents" element={<ClaimTopSecretDocumentsFoundOnPalestinianFighters />} />
                <Route path="/houthi-led-embargo-shipping" element={<ClaimTheHouthiledEmbargoOnShippingInTheRedSeaIsWhatIsHarmingPalestiniansAndImpactingTheEntryOfHumanitarianAidIntoGaza />} />
                <Route path="/palestinian-corpse-body" element={<ClaimPalestinianCorpseInBodyBagWasStaged />} />
                <Route path="/israeli-state-denies" element={<ClaimIsraeliStateDeniesInvolvementInTheKillingOfSixyearoldPalestinianGirlHindRajab />} />
                <Route path="/bbc-reports-released" element={<ClaimBbcReportsReleasedPalestinianPrisonerAsSayingOnlyHamasCared />} />
                <Route path="/israel-denies-attack" element={<ClaimIsraelDeniesAttackOnUnTrainingCentreAndRefugeInKhanYounisGaza />} />
                <Route path="/iof-claims-it" element={<ClaimIofClaimsItFoundMohammadDeifsPalestinianIdentityCardSeizedAtHisSistersHouse />} />
                <Route path="/israeli-state-claims" element={<ClaimTheIsraeliStateClaimsItIsTakingImmediateAndEffectiveMeasuresToProvideHumanitarianAssistanceAfterIcjProvisionalMeasuresRuling />} />
                <Route path="/israeli-officials-said" element={<ClaimIsraeliOfficialsSaidHostageEmilyHandWasKilled />} />
                <Route path="/israeli-forces-say" element={<ClaimIsraeliForcesSayTheyDoNotTargetPlacesWhereTheHostagesMayBe />} />
                <Route path="/israeli-soldier-claims" element={<ClaimIsraeliSoldierClaimsArabicCalendarIsHamasGuardListAtAlrantisiChildrensHospital />} />
                <Route path="/hamas-operatives-discussing" element={<ClaimHamasOperativesDiscussingPalestinianIslamicJihadsResponsibilityForTheAlahliArabBaptistHospitalMassacre />} />
                <Route path="/hamas-hid-weapons" element={<ClaimHamasHidWeaponsInIncubatorsInNicuAtKamalAdwanHospital />} />
                <Route path="/israel-brought-medical" element={<ClaimIsraelBroughtMedicalSupplyBoxesToAlshifaHospital />} />
                <Route path="/israel-bringing-medical" element={<ClaimIsraelBringingMedicalSuppliesAndIncubatorsToHelpAlreadyIncubatedBabiesToAlshifa />} />
                <Route path="/israeli-state-claims" element={<ClaimIsraeliStateClaimsPalestiniansBuriedMassGravesFoundAtNasserHospital />} />
                <Route path="/israeli-politician-former" element={<ClaimIsraeliPoliticianAndFormerPmNaftaliBennettClaimsSonOfOneOfHamasLeadersIsmailHaniyehIsBuyingExpensiveJewelleryInQatarWhileHisBrothersAndSistersAreSuffering />} />
                <Route path="/giving-palestinians-safe" element={<ClaimGivingPalestiniansASafePassageHumanitarianCorridorToEvacuate />} />
                <Route path="/hamas-has-rejected" element={<ClaimHamasHasRejectedOffersForACeasefire />} />
                <Route path="/hamas-broke-ceasefire" element={<ClaimHamasBrokeTheCeasefire />} />
                <Route path="/iof-got-confession" element={<ClaimIofGotConfessionOfAhmadKahalotTheDirectorOfKamalAdwanHospitalInJabaliyaThatHesASeniorHamasMember />} />
                <Route path="/palestinian-fighters-cut" element={<ClaimPalestinianFightersCutOffBreastsOfWoman />} />
                <Route path="/palestinian-fighters-raped" element={<ClaimPalestinianFightersRapedBabies />} />
                <Route path="/nico-astroga-claims" element={<ClaimNicoAstrogaClaimsHeWasASurvivorOf7OctOperationAtSupernovaFestivalSays29OfHisFriendsMurderedWasntEvenThere />} />
                <Route path="/hamas-responsible-260" element={<ClaimHamasResponsibleFor260DeathsInSurpriseAttackOnSupernovaFestival />} />
                <Route path="/hamas-video-said" element={<ClaimHamasInVideoSaidPutHerBackShesForRape />} />
                <Route path="/hamas-burnt-children" element={<ClaimHamasBurntChildrenHostagesWithExhaustPipes />} />
                <Route path="/hamas-planned-use" element={<ClaimHamasPlannedToUseChemicalWeaponsOn7October />} />
                <Route path="/there-no-churches" element={<ClaimThereAreNoChurchesInGaza />} />
                <Route path="/released-palestinian-prisoner" element={<ClaimReleasedPalestinianPrisonerIsraGabasWasAttemptedSuicideBomber />} />
                <Route path="/israeli-government-spokesperson" element={<ClaimIsraeliGovernmentSpokespersonSaysExchangedPalestinianPrisonersHaveBloodOnTheirHands />} />
                <Route path="/gaza-has-electricity" element={<ClaimGazaHasElectricityBecausePalestiniansAreUsingPhones />} />
                <Route path="/icj-threw-out" element={<ClaimTheIcjThrewOutSouthAfricasCase />} />
                <Route path="/hamas-drugged-hostages" element={<ClaimHamasDruggedHostagesWithClonazepamBeforeReleasingThemToMakeThemSeemHappy />} />
                <Route path="/nurse-al-shifa-hospital" element={<ClaimNurseAtAlshifaHospitalBlamingHamas />} />
                <Route path="/israeli-state-denies" element={<ClaimIsraeliStateDeniesStrikingAlshifaHospital />} />
                <Route path="/iof-find-weapons" element={<ClaimIofFindWeaponsBehindMriScannerAtAlshifaHospital />} />
                <Route path="/iof-israeli-state" element={<ClaimIofAndIsraeliStateClaimTheyAreNotBombingOrTargetingHospitalsForensicArchitectureConcludesOtherwise />} />
                <Route path="/israel-said-red" element={<ClaimIsraelSaidRedCrossWouldReturnToAlnasrHospitalToEvacuateBabiesInIcu />} />
                <Route path="/israel-denies-ordering" element={<ClaimIsraelDeniesOrderingWorldHealthOrganisationRemoveMedicalSuppliesFromItsWarehouseInSouthGaza />} />
                <Route path="/hamascom-official-hamas" element={<ClaimHamascomIsAnOfficialHamasWebsiteIsADebunkedCounterfeitWebsite />} />
                <Route path="/palestinian-fighters-burned" element={<ClaimPalestinianFightersBurnedBodiesOnOct7 />} />
                <Route path="/hostage-gave-birth" element={<ClaimHostageGaveBirthInCaptivity />} />
                <Route path="/hamas-left-isis" element={<ClaimHamasLeftAnIsisFlagBehind />} />
                <Route path="/fetus-removed-from" element={<ClaimFetusRemovedFromPregnantWoman />} />
                <Route path="/baby-baked-oven" element={<ClaimBabyBakedInOvenAndorMicrowaved />} />
                <Route path="/babies-hung-clotheslines" element={<ClaimBabiesHungOnClotheslines />} />
                <Route path="/1400-revisions-number" element={<Claim1400RevisionsOfNumberOfIsraelisKilled />} />
                <Route path="/israeli-state-denies" element={<ClaimIsraeliStateDeniesFamineInGaza />} />
                <Route path="/israeli-regime-isnt" element={<ClaimTheIsraeliRegimeIsntSeekingToDisplacePalestiniansInGaza />} />
                <Route path="/iof-claiming-help" element={<ClaimIofClaimingToHelpPalestinianEvacueesByGivingThemWater />} />
                <Route path="/protestors-toronto-targeted" element={<ClaimProtestorsInTorontoTargetedMtSinaiHospital />} />
                <Route path="/hostages-not-held" element={<ClaimTheHostagesWereNotHeldInReasonableConditions />} />
                <Route path="/israel-denies-using" element={<ClaimIsraelDeniesUsingWhitePhosphorusMunitionsInGaza />} />
                <Route path="/hamas-tunnel-found" element={<ClaimHamasTunnelFoundAtTheQatariHospital />} />
                <Route path="/israeli-state-finds" element={<ClaimIsraeliStateFindsDocumentsProvingHamasIsUsingMosquesForTerroristPurposes />} />
                <Route path="/hamas-members-relinquishing" element={<ClaimHamasMembersRelinquishingTheirWeaponsButIofPublishedTwoVideosShowingTwoDifferentTakes />} />
                <Route path="/fox-news-showing" element={<ClaimFoxNewsShowingIsraeliSoldiersArrestingHamasMember />} />
                <Route path="/bullets-baby-crib" element={<ClaimBulletsInBabyCribDuringElonMusksVisit />} />
                <Route path="/israels-ambassador-uk" element={<ClaimIsraelsAmbassadorToTheUkSaidThereIsASafeZoneForPalestiniansCalledMawasi />} />
                <Route path="/blood-found-childs" element={<ClaimBloodFoundInChildsBedroomImplyingMassacre />} />
                <Route path="/isaac-herzog-says" element={<ClaimIsaacHerzogSaysMeinKampfFoundInChildsBedroom />} />
                <Route path="/new-claim-test" element={<ClaimNewClaimTest />} />
                <Route path="/palestinian-captives-stripped" element={<ClaimPalestinianCaptivesStrippedDownNakedBecauseOfWarmWeatherInTheMiddleEastSaysMarkRegev />} />
                <Route path="/israeli-soldier-helps" element={<ClaimIsraeliSoldierHelpsElderlyPalestinianManInSafeCorridor />} />
                <Route path="/israeli-state-denies" element={<ClaimIsraeliStateDeniesKillingMotherAndDaughterSeekingRefugeInGazasHolyFamilyParish />} />
                <Route path="/claim" element={<Claim />} />
                <Route path="/israeli-state-denies" element={<ClaimChurchKillingDenial />} />
                <Route path="/israeli-soldier-helps" element={<ClaimElderlyManHelp />} />
                <Route path="/palestinian-captives-stripped" element={<ClaimNakedCaptivesWeather />} />
                <Route path="/new-claim" element={<ClaimNewClaim />} />
                <Route path="/" element={<Claim />} />

                
                {/* Route redirects to claim searches */}
                {/* <Route
                    path="/forty-beheaded-babies"
                    element={<Navigate to="/forty-beheaded-babies" replace />}
                />

                <Route
                    path="/al-ahli-attacked"
                    element={<Navigate to="/al-ahli-attacked" replace />}
                />
                
                <Route
                    path="/makeup"
                    element={<Navigate to="/makeup" replace />}
                /> */}

                {/* Routes that use search queries */}
                {/* <Route
                    path="/forty-beheaded-babies"
                    element={<Navigate to="/tracker?claim=Forty%20beheaded%20babies" replace />}
                />


                <Route
                    path="/al-ahli-attacked"
                    element={<Navigate to="/tracker?claim=Al-Ahli%20Hospital%20was%20attacked%20by%20Palestinian%20rockets,%20not%20Israeli%20forces" replace />}
                />
                
                <Route 
                    path="/al-shifa-fuel"
                    element={<Navigate to="/tracker?claim=Israeli%20state%20offered%20fuel%20to%20Al-Shifa%20Hospital" replace />}
                /> */}
                </Routes>
            </Router>
        </AuthProvider>
    </HelmetProvider>
    </>
  );  
}

export default App;
