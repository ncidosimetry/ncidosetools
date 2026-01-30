# NCICT 3.0

![NCICT overview](https://github.com/user-attachments/assets/cc703512-17b8-49f8-92a2-9caa71083e3c)

---

## Download

### [DOWNLOAD LINK](https://drive.google.com/drive/folders/1B2cI9eewJzRn5DJMaOGJ1RloNv0blxSF?usp=share_link)

Access to the download link is restricted to users with:
- an approved **Software Transfer Agreement (STA)** for non-commercial research use, or  
- a completed **commercial licensing agreement**.

Unlicensed access or redistribution is not permitted.

---

## Available Resources

The following resources are available from the download link:

- `ncict_batch_input.csv`  
- `NCICT3.0_XXXXXXXX_mac.dmg`  
- `NCICT3.0_XXXXXXXX_windows.exe`  
- Recommended citation: **NCICT1**  
- Recommended citation: **NCICT2**

---

## Version History

### 2024-12-16
- Bug fix: Batch run menu not functioning correctly

### **2024-12-15 — Official Release (Version 3.0.20241215)**
- Links to the user manual and user forum added

### 2024-06-26
- Bug fix: X-ray spectrum index mismatch between 100 and 120 kVp corrected

### 2024-02-29
- Bug fix: Tube current modulation (TCM) profile for body phantoms not properly selected

### 2024-01-25
- Bug fix: Effective diameter and SSDE not updated when scan range changed

### **2024-01-24 — Official Release (Version 3.0.20240124)**
- Head CTDI phantom–based tube current modulation profiles added to more realistically simulate TCM for pediatric patients
- Muscle layers in frontal and rear phantom views removed to improve visualization of internal anatomy

### 2023-04-28
- Frontal and rear views of ICRP phantoms revised

### **2022-12-14 — Official Release (Version 3.0.20221123)**

### 2022-11-23
- NCICT 2.0 published:  
  Lee et al., *“CT organ dose calculator size adaptive for pediatric and adult patients,”*  
  **Biomedical Physics & Engineering Express**, 8:065020 (2022)

### 2021-11-23
- Bug fix: Program no longer stops when blank lines remain in batch input files (often introduced during CSV editing in Excel)

### 2021-11-20
- Tube current profile per image slice displayed alongside phantom visualization
- “Average CTDI<sub>vol</sub>” displayed when TCM strength > 0
- “Custom CTDI<sub>vol</sub>” displayed when CTDI<sub>vol</sub> is manually entered
- Multiple bugs related to TCM in the batch module fixed

### 2021-10-27
- Height and weight fields made non-editable when body size–dependent phantoms are selected; body size adjustable only via arrow controls
- Batch input enabled for pregnant women (phantom group 5) and fetal phantoms (phantom group 6)
- User Manual and User Forum menu items added under the **Help** menu

### 2021-10-21
- Tube current (mA) derived from custom CTDI<sub>vol</sub> values; TCM enabled for derived mA

### 2021-09-15
- Bug fix: Program no longer stops when batch input file is missing
- mA and rotation time separated from mAs to allow proper TCM adjustment
- mA limit added to prevent unrealistically high mA values for obese patients in TCM mode
- TCM disabled when a custom CTDI<sub>vol</sub> is entered

### 2021-05-20
- Automatic selection of the best-matching phantom based on patient height and weight added to batch mode

### **2021-05-13 — Official Release (Version 3.0.20210513)**
- Batch calculation functionality added (see `ncict_batch_input.csv`)
- Tube current modulation implemented using generic modulation profiles

### 2021-03-07
- Effective diameter calculation added for pregnant women phantoms

### **2020-03-12 — Official Release (Version 3.0.20200312)**
- Scan range dragging speed improved for Windows version

### 2019-12-05
- Maternal organ dose calculations added (NCICT 3.0.20191205)
- Presented at RSNA 2019

### 2019-03-01
- Eight pregnant phantoms with fetal models added
- Fetal organ dose calculations enabled
- NCICT 3.0 build 20190301 released

### **2018-11-18 — Official Release (Version 2.0.20181118)**
- 98 additional adult phantoms added, completing the full set of 351 phantoms
- NCICTX presented at AAPM 2018; renamed to NCICT

### 2016-04-01
- 72 adult and 181 pediatric phantoms added (NCICTX 20160401)
- Presented at AAPM 2016

### 2015-12-01
- NCICT 1.0 published in *Journal of Radiological Protection*  
  Lee et al., JRP (2015)
- Presented at RSNA 2015

### **2014-12-01 — Official Release (Version 1.0.20141201)**
- ICRP pediatric and adult phantoms replaced original NCI phantoms

### 2012-04-18
- MATLAB version translated to Visual Basic 6.0 (NCICT 1.0.20120418)
- Batch routine implemented for automated calculations
- Public beta testing initiated under a non-official data agreement

### 2011-05-17
- Initial release of NCICT 1.0 based on NCI phantoms and MATLAB framework
