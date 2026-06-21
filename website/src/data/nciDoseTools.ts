import ncictImage from "../../gui/ncict.png";
import ncinmImage from "../../gui/ncinm.png";
import ncirfImage from "../../gui/ncirf.png";

export const portalLinks = {
  officialNci: "https://dceg.cancer.gov/tools/radiation-dosimetry-tools",
  staForm:
    "https://dceg.cancer.gov/tools/radiation-dosimetry-tools/ncidose-software-transfer-agreement.pdf",
  github: "https://github.com/ncidosimetry/ncidosetools",
  googleGroup: "https://groups.google.com/g/ncidose",
  linkedin: "https://www.linkedin.com/in/choonsiklee/",
};

export const tools = [
  {
    id: "ncict",
    name: "NCICT",
    fullName: "National Cancer Institute dosimetry system for Computed Tomography",
    modality: "Computed Tomography",
    method: "Monte Carlo-based library of dose conversion coefficients",
    image: ncictImage,
    imageAlt: "NCICT graphical interface showing CT scan inputs, phantom preview, and organ dose table",
    summary:
      "Uses 12 reference-size, 362 pediatric and adult male/female size-dependent, and 8 pregnant computational phantoms.",
    comparison: {
      bestFor:
        "Retrospective or cohort-scale CT organ dose estimation across scanner protocols and patient sizes.",
      primaryInputs:
        "Patient age/sex or size metrics, scan range, CTDIvol or scanner exposure parameters.",
      calculationBasis: "Monte Carlo-derived CT dose conversion coefficients.",
    },
    suiteSummary:
      "NCICT supports standardized CT organ dose estimation for research studies that need consistent estimates across patients, scanner protocols, and body sizes.",
    intro:
      "NCICT supports standardized CT organ dose estimation for pediatric, adult, and pregnant CT studies that need consistent estimates across patients, scanner protocols, and body sizes. It combines reference, size-dependent, and pregnant computational phantoms with organ and structure dose tables for reproducible cohort analysis.",
    details: [
      "Users can define patient anatomy from age and sex, measured height and weight, or water-equivalent diameter when available. Scan coverage can be entered numerically or by anatomical landmark IDs, which helps retrospective studies translate protocol descriptions into reproducible dose regions.",
      "The calculation is driven by Monte Carlo-derived organ dose conversion coefficients. CTDIvol may be entered directly, or estimated from scanner and exposure parameters when needed, with optional tube-current modulation information.",
      "GUI and batch-oriented workflows use the same parameter definitions, making the tool suitable for both manual review and cohort-scale automation.",
    ],
    advantages: [
      "AAPM water-equivalent diameter-based phantom selection.",
      "360+ phantoms spanning broad body habitus variation.",
      "Fetal dose estimates across 8 gestational ages.",
    ],
    output:
      "Organ absorbed dose, effective dose, and CT-related metrics such as DLP and SSDE for epidemiologic studies, outcomes research, benchmarking, and sensitivity analysis.",
    manualHref:
      "https://github.com/ncidosimetry/ncidosetools/wiki/NCICT-User-Manual",
    versionHistoryHref:
      "https://github.com/ncidosimetry/ncidosetools/tree/main/NCICT",
  },
  {
    id: "ncirf",
    name: "NCIRF",
    fullName: "National Cancer Institute dosimetry system for Radiography and Fluoroscopy",
    modality: "Radiography and Fluoroscopy",
    method: "Full Monte Carlo simulation based on Geant4",
    image: ncirfImage,
    imageAlt:
      "NCIRF graphical interface showing radiography and fluoroscopy beam geometry with organ dose results",
    summary:
      "Uses 12 reference-size, 362 pediatric and adult male/female size-dependent, and 8 pregnant computational phantoms.",
    comparison: {
      bestFor:
        "Radiography and fluoroscopy dose estimation where projection geometry and field placement drive dose.",
      primaryInputs:
        "Phantom selection, kVp/HVL, DAP, source distance, field size, projection angles, isocenter, and table settings.",
      calculationBasis: "Direct Geant4 Monte Carlo radiation transport.",
    },
    suiteSummary:
      "NCIRF addresses projection imaging and fluoroscopy procedures where beam geometry, body size, and nonuniform exposure patterns strongly affect organ and tissue dose.",
    intro:
      "NCIRF supports geometry-aware dose estimation for radiographic and fluoroscopic procedures where beam geometry, body size, and nonuniform exposure patterns strongly affect organ and skin dose. It combines reference, size-dependent, and pregnant phantoms with configurable exposure geometry for research and licensed vendor workflows.",
    details: [
      "Users select reference, size-dependent, or pregnant phantoms, then define the x-ray beam using kVp/HVL, DAP, source-to-isocenter distance, field size, projection angles, isocenter location, and table thickness.",
      "Unlike NCICT and NCINM, NCIRF performs direct Geant4 Monte Carlo radiation transport for the specified exposure geometry. Phantom and beam views provide visual confirmation of field placement before simulation.",
      "A unified batch manager supports repeated RF dose calculations for research datasets and validation studies.",
    ],
    advantages: [
      "Accelerated Monte Carlo engine for accurate RF organ-dose simulation.",
      "Highly customizable irradiation geometry for vendor workflow mapping.",
      "362 body-habitus phantoms plus fetal-dose support.",
    ],
    output:
      "Organ absorbed dose, Monte Carlo statistical error, peak skin dose, and effective dose for projection imaging studies and modality-specific dose estimation workflows.",
    manualHref:
      "https://github.com/ncidosimetry/ncidosetools/wiki/NCIRF-User-Manual",
    versionHistoryHref:
      "https://github.com/ncidosimetry/ncidosetools/tree/main/NCIRF",
  },
  {
    id: "ncinm",
    name: "NCINM",
    fullName: "National Cancer Institute dosimetry system for Nuclear Medicine",
    modality: "Nuclear Medicine",
    method:
      "Monte Carlo-based library of SAFs combined with ICRP radionuclide energy spectra",
    image: ncinmImage,
    imageAlt:
      "NCINM graphical interface showing radionuclide selection, fetal phantom preview, and target organ dose table",
    summary:
      "Uses 12 reference-size and 8 pregnant computational phantoms.",
    comparison: {
      bestFor:
        "Nuclear medicine absorbed-dose estimation using radionuclide, radiopharmaceutical, or source-region data.",
      primaryInputs:
        "Radionuclide or radiopharmaceutical, administered activity, source-region residence times, or cumulated activities.",
      calculationBasis:
        "Precomputed S values with ICRP radionuclide emission spectra.",
    },
    suiteSummary:
      "NCINM supports absorbed dose estimation for nuclear medicine research, including workflows that need consistent radionuclide, anatomy, and biokinetic assumptions.",
    intro:
      "NCINM supports pediatric, adult, and pregnancy-oriented nuclear medicine dose estimation for workflows that need consistent radionuclide, anatomy, and biokinetic assumptions. It connects reference and pregnant computational phantoms with radionuclide and source-region dose coefficient calculations for reproducible absorbed-dose estimation.",
    details: [
      "The tool supports radionuclide-based calculations when source-region residence times or cumulated activities are known, and radiopharmaceutical-based workflows when predefined biokinetic data are available.",
      "NCINM combines pre-calculated S values with ICRP radionuclide emission spectra and administered activity. The radionuclide library covers a broad set of photon and electron emitters, while fetal calculations use mother-to-fetus S values with user-entered maternal source-region data.",
      "Batch-oriented workflows can match clinical-style radiopharmaceutical names to library entries for scalable retrospective studies.",
    ],
    advantages: [
      "Fuzzy algorithm-based radiopharmaceutical name matching.",
      "S values for 1,000+ radionuclides.",
      "Fetal dose estimates across 8 gestational ages.",
    ],
    output:
      "Target-organ absorbed dose, dose per administered activity, and effective dose for supported adult and pediatric workflows, study documentation, and reproducible analysis.",
    manualHref:
      "https://github.com/ncidosimetry/ncidosetools/wiki/NCINM-User-Manual",
    versionHistoryHref:
      "https://github.com/ncidosimetry/ncidosetools/tree/main/NCINM",
  },
  {
    id: "phantom",
    name: "PHANTOM",
    fullName: "Computational Human Anatomical Models",
    modality: "Shared anatomical foundation",
    method: "Patient CT-based manual segmentation and modification to match reference data",
    image: null,
    imageAlt: "",
    summary:
      "A library of 12 reference-size, 362 pediatric and adult male/female size-dependent, and 8 pregnant phantoms spanning height, weight, and body habitus variation.",
    comparison: {
      bestFor:
        "Shared anatomical models for research comparison, validation, and dose-tool consistency.",
      primaryInputs:
        "Reference anatomy targets, height/weight body habitus groups, pregnancy stage, and organ definitions.",
      calculationBasis:
        "Patient CT segmentations adjusted to reference anatomical data.",
    },
    suiteSummary:
      "The PHANTOM libraries provide the anatomical basis shared across the NCI Dose Tools ecosystem.",
    intro:
      "The PHANTOM libraries provide the shared anatomical basis for CT, nuclear medicine, and radiography/fluoroscopy dosimetry. They include reference-size, size-dependent pediatric and adult male/female, and pregnant computational phantoms with consistent organ definitions for research, validation, and benchmarking.",
    details: [
      "The models are derived from patient CT-based manual segmentation and then modified to match reference anatomical data. This produces anatomies that are realistic enough for organ-level dosimetry while remaining standardized for research comparison.",
      "The size-dependent library spans pediatric female, pediatric male, adult female, and adult male body habitus groups across height and weight. This lets NCICT and NCIRF select a closer anatomical match than a small reference-only phantom set.",
      "PHANTOM is not a dose calculator by itself; it is the shared anatomical infrastructure that improves consistency across CT, RF, and nuclear medicine workflows, especially when comparing dose estimates across modalities or populations.",
    ],
    advantages: [
      "ICRP reference-data-based, reference-grade computational phantoms.",
      "Multiple phantom formats for different simulation and integration purposes.",
      "Treatment-planning-system-ready DICOM CT images and structure sets.",
    ],
    output:
      "The phantom libraries make cross-modality dose estimates more consistent by anchoring CT, NM, and RF tools to the same reference-grade anatomical foundation.",
    manualHref:
      "https://github.com/ncidosimetry/ncidosetools/wiki/PHANTOM-User-Manual",
    versionHistoryHref:
      "https://github.com/ncidosimetry/ncidosetools/tree/main/PHANTOM",
  },
];

export type DoseTool = (typeof tools)[number];

const literatureQueries = {
  ncictPubmed:
    '("NCICT"[Title/Abstract] OR "National Cancer Institute dosimetry system for Computed Tomography"[Title/Abstract] OR "National Cancer Institute dosimetry system for CT"[Title/Abstract]) AND ("computed tomography"[Title/Abstract] OR "CT dosimetry"[Title/Abstract] OR "CT scan"[Title/Abstract] OR "CT scans"[Title/Abstract] OR "CT imaging"[Title/Abstract] OR "CT examination"[Title/Abstract] OR "CT examinations"[Title/Abstract] OR "PET/CT"[Title/Abstract])',
  ncictPmc:
    '("NCICT"[body] OR "National Cancer Institute dosimetry system for Computed Tomography"[body] OR "National Cancer Institute dosimetry system for CT"[body]) AND ("computed tomography"[body] OR "CT dosimetry"[body] OR "CT scan"[body] OR "CT scans"[body] OR "CT imaging"[body] OR "CT examination"[body] OR "CT examinations"[body] OR "PET/CT"[body])',
  ncirfPubmed:
    '("NCIRF"[Title/Abstract] OR "National Cancer Institute dosimetry system for Radiography and Fluoroscopy"[Title/Abstract]) AND (radiography[Title/Abstract] OR radiographic[Title/Abstract] OR fluoroscopy[Title/Abstract] OR fluoroscopic[Title/Abstract])',
  ncirfPmc:
    '("NCIRF"[body] OR "National Cancer Institute dosimetry system for Radiography and Fluoroscopy"[body]) AND (radiography[body] OR radiographic[body] OR fluoroscopy[body] OR fluoroscopic[body])',
  ncinmPubmed:
    '("NCINM"[Title/Abstract] OR "National Cancer Institute dosimetry system for Nuclear Medicine"[Title/Abstract]) AND ("nuclear medicine"[Title/Abstract] OR radionuclide[Title/Abstract] OR radiopharmaceutical[Title/Abstract] OR "internal dosimetry"[Title/Abstract] OR "organ dose"[Title/Abstract])',
  ncinmPmc:
    '("NCINM"[body] OR "National Cancer Institute dosimetry system for Nuclear Medicine"[body]) AND ("nuclear medicine"[body] OR radionuclide[body] OR radiopharmaceutical[body] OR "internal dosimetry"[body] OR "organ dose"[body])',
  phantomPubmed:
    '("NCI/UF"[Title/Abstract] OR "NCI-UF"[Title/Abstract] OR "National Cancer Institute/University of Florida"[Title/Abstract] OR "reference hybrid phantom"[Title/Abstract] OR "reference hybrid phantoms"[Title/Abstract] OR ("UF family"[Title/Abstract] AND (phantom[Title/Abstract] OR phantoms[Title/Abstract] OR dosimetry[Title/Abstract] OR radiation[Title/Abstract])) OR (("hybrid computational phantom"[Title/Abstract] OR "hybrid computational phantoms"[Title/Abstract]) AND ("National Cancer Institute"[Title/Abstract] OR "National Cancer Institute"[Affiliation] OR NCI[Title/Abstract] OR "University of Florida"[Title/Abstract] OR "University of Florida"[Affiliation] OR UF[Title/Abstract])))',
  phantomPmc:
    '("NCI/UF"[body] OR "NCI-UF"[body] OR "National Cancer Institute/University of Florida"[body] OR "reference hybrid phantom"[body] OR "reference hybrid phantoms"[body] OR ("UF family"[body] AND (phantom[body] OR phantoms[body]) AND (dosimetry[body] OR radiation[body])) OR (("hybrid computational phantom"[body] OR "hybrid computational phantoms"[body]) AND ("National Cancer Institute"[body] OR NCI[body] OR "University of Florida"[body] OR UF[body])))',
};

const pubmedUrl = (query: string) =>
  `https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(query)}`;

const pmcUrl = (query: string) =>
  `https://pmc.ncbi.nlm.nih.gov/search/?term=${encodeURIComponent(query)}`;

export const publicationSearches = [
  {
    id: "ncict",
    tool: "NCICT",
    modality: "CT dosimetry",
    pubmedHref: pubmedUrl(literatureQueries.ncictPubmed),
    pmcHref: pmcUrl(literatureQueries.ncictPmc),
    summary:
      "CT dosimetry publications document NCICT dose estimation, benchmarking, and cohort-scale imaging workflows.",
  },
  {
    id: "ncirf",
    tool: "NCIRF",
    modality: "Fluoroscopy dosimetry",
    pubmedHref: pubmedUrl(literatureQueries.ncirfPubmed),
    pmcHref: pmcUrl(literatureQueries.ncirfPmc),
    summary:
      "Peer-reviewed RF dosimetry publications continue to expand around projection imaging and fluoroscopy workflows.",
  },
  {
    id: "ncinm",
    tool: "NCINM",
    modality: "Nuclear medicine dosimetry",
    pubmedHref: pubmedUrl(literatureQueries.ncinmPubmed),
    pmcHref: pmcUrl(literatureQueries.ncinmPmc),
    summary:
      "Nuclear medicine publications are tracked with NCINM-specific terms combined with radionuclide, radiopharmaceutical, and internal dosimetry language.",
  },
  {
    id: "phantom",
    tool: "PHANTOM",
    modality: "Computational phantom literature",
    pubmedHref: pubmedUrl(literatureQueries.phantomPubmed),
    pmcHref: pmcUrl(literatureQueries.phantomPmc),
    summary:
      "Hybrid computational phantom publications document the NCI/UF anatomical model foundation used across dose-estimation workflows.",
  },
];
