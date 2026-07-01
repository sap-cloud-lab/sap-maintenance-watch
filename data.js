window.sapWatchData = {
  sourceChecked: "2026-07-01",
  timezone: "Australia/Sydney",
  sourceLabel: "SAP S/4HANA Cloud Public Edition, 3-System Landscape - Upgrade & Maintenance Schedule",
  calendarImportFile: "SAP-S4HANA-Cloud-Maintenance-Watch.ics",
  events: [
    {
      id: "2026-W26",
      week: "2026-W26",
      title: "W26 hotfix / patching",
      category: "maintenance",
      displayTime: "Sun 2026-06-28, 01:00-05:00 AEST",
      start: "2026-06-28T01:00:00+10:00",
      end: "2026-06-28T05:00:00+10:00",
      systems: "Current 2602 cycle",
      description: "Hotfix / patching watch window for SAP S/4HANA Cloud Public Edition 2602. SAP Note 3646210 shows HFC13 released on 25.06.2026, with 91 application corrections in the attached short-description PDF. SAP also announced final What's New and Product Assistance for 2602.4, and SAP Help lists 54 official 2602.4 (HFC12) What's New entries dated 26.06.2026, including Developer Extensibility, migration objects, Joule, billing, finance, compliance, projects, quality, and logistics updates.",
      outlook: "Created as a free calendar item with a 12-hour reminder.",
      hotfixCollection: {
        code: "HFC13",
        release: "2602",
        releasedOn: "25.06.2026",
        sapNote: "3646210",
        sapNoteTitle: "SAP S/4HANA Cloud Public Edition 2602 and SAP Marketing Cloud 2602 - Patch Collection Information Note",
        noteUrl: "https://me.sap.com/notes/3646210",
        attachment: "S4HANACloud2602HFC13_ListOfHotfixShortDescription.pdf",
        correctionCount: 91,
        corrections: [
          { component: "BNS-ARI-CI-S4-MM", summary: "Ariba Integration with S/4HANA SOAP API - MM Invoice Status Not Updating from S/4HANA Public Cloud to Ariba" },
          { component: "CA-CPD-SS", summary: "S/4HANA Professional Services Cloud - CPM ATC Corrections" },
          { component: "CA-CPD-SS", summary: "S/4HANA Professional Services Cloud - CPM Transfer Project Plan to Finance issue" },
          { component: "CA-DT-MIG-S4C", summary: "S/4HANA Migration Cockpit - Direct Transfer: ERP Cloud Content Correction Request for 2602 CE - 03/06/2026" },
          { component: "CA-GTF-CSC-EDO-DCC", summary: "Document Compliance Cockpit Hotfix - Navigate to source document APP" },
          { component: "CA-GTF-CSC-EDO-FR", summary: "Document Compliance France France Domestic Customer Payment" },
          { component: "CA-GTF-CSC-EDO-IN-DC", summary: "Document Compliance India DCS LC: Shipto GSTIN is Mandatory" },
          { component: "CA-GTF-CSC-EDO-PL", summary: "Document Compliance Poland Code Corrections - Poland Ksef: Email Fetching Logic Fix" },
          { component: "CA-GTF-CSC-EDO-PL", summary: "Document Compliance Poland Code Corrections - Single Value Mapping method call for PAYM" },
          { component: "CA-GTF-CSC-EDO-PL", summary: "Document Compliance Poland Fix invoice line tags: StanPrzed KursWalutyZ" },
          { component: "CA-GTF-CSC-EDO-PL", summary: "Document Compliance Poland Code Corrections - Adding URL field in EDOPLINV containing QR code image" },
          { component: "CA-LT-OBT-TDR", summary: "SAP S/4HANA, test data refresh: Technology Renumbering: Ignore obsolete interval 24 of RV_BELEG" },
          { component: "CA-MDG-CMP-MM", summary: "Material Update SU 22 and SAP_WFR_SAPSCORE - Product Delete issue" },
          { component: "CA-TS-S4", summary: "Cross Application Timesheet in S/4HANA Time recording via concurrent employment recognized as inter company" },
          { component: "CA-TS-S4", summary: "Cross Application Timesheet in S/4HANA Test Data Refresh: Check Failed - SDMI in Source" },
          { component: "CA-VCM-2CL", summary: "Value Chain Monitoring Framework (Public Cloud) Determine Adv. ICO ToC dates based on SPE_LE_SCENARIO" },
          { component: "CBC-S4-CCP", summary: "Integration of S/4 HANA Cloud with CBC - Cust. Conversion Fix: redundant WHN in empty PLT solutions org unit" },
          { component: "CBC-S4-CCP", summary: "Integration of S/4 HANA Cloud with CBC - Cust. Conversion Update of /SMB/TBL_CNV for PPL and CCP deployment in HF13" },
          { component: "CBC-S4-CCP", summary: "Integration of S/4 HANA Cloud with CBC - Cust. Conversion BAC Mapping sync 2702 HFC12" },
          { component: "CBC-S4-DIC", summary: "Integration of S/4 HANA Cloud with CBC - Data Dictionary Delete entry TDWA in table /SMB/EXM_TABLES to prevent customer issues" },
          { component: "CO-PC-ACT-2CL", summary: "Actual Costing (Public Cloud) Display Actual Costing Result cannot extract data" },
          { component: "CO-PC-OBJ-EBR-2CL", summary: "Event-Based Revenue Recognition (Public Cloud) App Display Project WIP Details (F4766) does not check Restriction Type PPM_PRJ for confidential projects" },
          { component: "CRM-S4-IHR-2CL", summary: "S4CRM: In-House Repair (Public Cloud) Rejected Quotation not creating an outbound delivery" },
          { component: "CRM-S4-SRV-SVO-2CL", summary: "S4CRM: Service Order (Public Cloud) Hotfix: Unable to delete item 10 in purchase order 4500078996 due to account assignment lock" },
          { component: "CRM-S4-SRV-SVO-2CL", summary: "S4CRM: Service Order (Public Cloud) WBS for service contract is not triggered" },
          { component: "FI-LOC-BOE", summary: "Bill of Exchange New feature ID updating for metering in CE2602" },
          { component: "FI-LOC-CNT-AR", summary: "S4H Best Practices for Argentina $RC_Else - Update content for table V_1ACHRDET since it was delivered with wrong entry" },
          { component: "FI-LOC-CNT-BR", summary: "S4H Best Practices for Brazil BR Legal Change GSREQAMER-19215" },
          { component: "FI-LOC-CNT-BR", summary: "S4H Best Practices for Brazil BR LC GSREQAMER-19215" },
          { component: "FI-LOC-CNT-PE", summary: "S4H Best Practices for Peru Hotfix for the variant file VVC_T683_VA_V_T683S_BMJ.TXT - field I_DRUKZ - cause XML rejection" },
          { component: "FI-LOC-CNT-VN", summary: "Vietnam BO mapping file became inconsistent after adding country identifier to filename, fix for 2602" },
          { component: "FI-LOC-EPI-CN", summary: "China Fix custom field value not passed correctly in EPIC_EBR_SAVING BAdI" },
          { component: "FI-LOC-FI-AR-ACR", summary: "Advanced Compliance Reporting CM 543837/2026: Issue with txt file from the AR_PURCHASE_VAT_DCL report Argentina" },
          { component: "FI-LOC-FI-BR-REI", summary: "DRC EFD-Reinf Report [CE] EFD-Reinf - NT03/2026" },
          { component: "FI-LOC-FI-CN", summary: "China [GLOFIN] The amount in the cash flow is incorrect" },
          { component: "FI-LOC-FI-IN-WHT", summary: "Withholding Tax Non-compliant SSCUI" },
          { component: "FI-LOC-FI-TR", summary: "Turkey Electronic Ledger - year opening entries from previous years included in report" },
          { component: "FI-LOC-GAI-CN", summary: "China HF: CADE CBC Scope Item" },
          { component: "FI-LOC-LO-HR", summary: "Croatia GLO LOG: HFC 1 for HR and RO, HFC 13 for RO" },
          { component: "FI-LOC-LO-IN", summary: "India Tax Config Agent UI Service Changes" },
          { component: "FI-LOC-LO-IN", summary: "India AFD local currency exchange rate correction" },
          { component: "FI-LOC-NFE-BR-OUT", summary: "Outbound [Case] 643166/2026 - Outbound NFS-e: vRetCSLL wrong amount in multi-item NFS-e National" },
          { component: "FI-LOC-NFE-BR-OUT", summary: "Outbound [DRC NF-e] Tax Reform - SP NFS-e Layout - PIS COFINS handling" },
          { component: "FI-LOC-SD-IN", summary: "India (aka XX-CSC-IN-SD) Duplicate challan for same material document Corrections II" },
          { component: "FI-LOC-SRF-RUN", summary: "Advanced Compliance Reporting (Run Time) SAP DRC Error when trying to start an activity for creating a return for TDD environment" },
          { component: "FI-LOC-SRF-RUN", summary: "Advanced Compliance Reporting (Run Time) Feature Toggle for activity status" },
          { component: "FI-LOC-VAT-GEN", summary: "ACR Generic Activities Hotfix for issue in Short Summary File Generation in Report Submission of DRR" },
          { component: "FIN-CS-COR-DT-2CL", summary: "Data Transfer (Public Cloud) DTXI - E2E Test - ET+DA Update" },
          { component: "FIN-CS-COR-DT-FU-2CL", summary: "File Upload (Public Cloud) [DTXI] Invalid status S when error occurs in data adapter" },
          { component: "FIN-CS-COR-DT-FU-2CL", summary: "File Upload (Public Cloud) [DTXI] legacy wrapper fix" },
          { component: "FIN-CS-COR-IS-2CL", summary: "Information System (Public Cloud) [Task Log] Summary failing unit test, HF 2" },
          { component: "FIN-CS-RUL-2CL", summary: "Group Reporting Rule Engine (Public Cloud) Automatic posting rule posting on wrong doc type" },
          { component: "FIN-FSCM-PF-PAY-2CL", summary: "Advanced Payment Management (Public Cloud) CPR duplicate checking" },
          { component: "FIN-FSCM-TRM-2CL", summary: "Treasury and Risk Management (Public Cloud) XPRA report for SWFDVEVTYNOOPT" },
          { component: "FIN-FSCM-TRM-AC-2CL", summary: "Position Management and Accounting (Public Cloud) Hotfix: Correction Report for Customer Case 622221/2026: Error Reverse Posting Document in Sec" },
          { component: "FIN-UA-2CL", summary: "Universal Allocations (Public Cloud) Unit tests XPRA" },
          { component: "LE-IDW-2CL", summary: "Decentralized WMS Integration (Public Cloud) 3PL Inbound Deliveries with Stocktype do not use correct storage location" },
          { component: "LE-IDW-2CL", summary: "Decentralized WMS Integration (Public Cloud) qRFC queues with locking errors do not restart" },
          { component: "LE-SHP-API-2CL", summary: "Interfaces for Delivery Documents (API) (Public Cloud) delivery date ignored in inbound delivery creation per OData" },
          { component: "LO-AB", summary: "Agency Business / Settlement Management Authorization handling in case of company code restriction for auth. obj. W_WBRK_PER" },
          { component: "LO-MD-BOM-2CL", summary: "Bills of Material (Public Cloud) BDEF changes in A_BillOfMaterial_1 for MCP" },
          { component: "LO-MD-BP-2CL", summary: "Business Partners for Public Cloud DCP corrections - invalid Data Controller issue fix" },
          { component: "LO-MD-MM-2CL", summary: "Product Master for Public Cloud Fix for customer incident: New mandatory field PRT usage in plant section product master data" },
          { component: "LO-MD-MM-2CL", summary: "Product Master for Public Cloud SSCUI AutoSkip - Retail System Logic Enhancement" },
          { component: "LO-RFM-IFC-IN-SRV", summary: "Service based POS Interface - Inbound Problem with Billing document Output Determination, Document Type FP (Invoice POS Interface)" },
          { component: "LO-RFM-PP-2CL", summary: "Production Planning for Fashion (Public Cloud) Fashion MRP Missing Planning file entry error - HF correction" },
          { component: "LO-RFM-STO-FIO", summary: "In-Store Merchandise and Inventory Management - Fiori Apps Create In-Store Sales Order App - Scanning alternative GTIN does not work" },
          { component: "LO-RFM-STO-FIO", summary: "In-Store Merchandise and Inventory Management - Fiori Apps [RFM] - Transfer Product on hand quantity issue (CS20260012497010)" },
          { component: "MM-FIO-PUR-ANA-2CL", summary: "Fiori UI for Purchasing Analytics (Public Cloud) Data Product Fixes: Purchasing Info Record" },
          { component: "MM-FIO-PUR-ANA-2CL", summary: "Fiori UI for Purchasing Analytics (Public Cloud) App Material Price Variance does not load due to performance issue" },
          { component: "MM-IV-LIV-2CL", summary: "Logistics Invoice Verification (Public Cloud) CS20260012225580: Extend SuplInvWRKFLW note index to 3 char" },
          { component: "MM-PUR-PO-2CL", summary: "Purchase Orders (Public Cloud) System dumps when PO is created from service order" },
          { component: "MM-PUR-PO-2CL", summary: "Purchase Orders (Public Cloud) Subcontracting BOM Explosion - validity date" },
          { component: "MM-PUR-PO-2CL", summary: "Purchase Orders (Public Cloud) Add missing field BEDNR to MM_PUR_S4_PO_MODIFY_ITEM" },
          { component: "PM-EQM-SF-MPC-2CL", summary: "Measuring points and counters (Public Cloud) Measuring Point API Error - Measuring point XXXX is locked by user \"\"" },
          { component: "PM-PRM-MP-2CL", summary: "Maintenance Plans (Public Cloud) Enhancement of API to filter based on functional location and equipment" },
          { component: "PM-PRM-TL-2CL", summary: "Task Lists (Public Cloud) CS20260012388046 - Object does not exist error in Change Documents App" },
          { component: "PP-FIO-SFC-2CL", summary: "Fiori UI for Production Orders (Public Cloud) Enabling Feature Toggle in SSCUI for AI297" },
          { component: "PP-PMR-2CL", summary: "Predictive MRP (Public Cloud) PMRP: Missing components and wrong qty" },
          { component: "PP-SFC-ES-2CL", summary: "Enterprise Services in Shop Floor Control (Public Cloud) [Correction] OData PATCH" },
          { component: "PPM-SCL-STR", summary: "Project Structure (Public Cloud) 1NT: Enterprise project - Project with Revenue's settlement rule is missing" },
          { component: "PSM-FM-BU-AC", summary: "Availability Control PSM enhancement of AVC shared lock handling" },
          { component: "PSM-FM-UP-CM", summary: "Commitments Hotfix for Correction Report - 133651/2026 - Country Fire Authority" },
          { component: "QM-CA-CG-2CL", summary: "Quality Certificate Creation (Public Cloud) Case674550/2026" },
          { component: "SCM-EWM-API-2CL", summary: "Remote APIs (Public Cloud) Fixedbin Assignment API: Enable EWMStorQtyUnitSAPCode" },
          { component: "SCM-EWM-PI-2CL", summary: "Physical Inventory (Public Cloud) [WM][C]2702 Toolbar issue on ObjectPage" },
          { component: "SD-BIL-2CL", summary: "Billing (Public Cloud) [Billing Posting Agent] Expose Pricing Type on UI_BillingDocument_AI" },
          { component: "SD-BIL-PBD-2CL", summary: "Preliminary Billing Documents (Public Cloud) 2608.1 - Bug fix for PBD modify BAdI logic" },
          { component: "SV-CLD-PC", summary: "S4HANA Product Content - PSCC org 2602: Unassignment of BBs 390 and 39F from 5SW" },
          { component: "TM-FRM-2CL", summary: "Freight Order Management (Public Cloud) [CS20260012494355] Change ASR read api to use transactional handling" },
          { component: "TM-INT-LI-2CL", summary: "Logistics Integration - General HSS_SAP_COM_0573_Paramters_addtion" }
        ]
      },
      productUpdates: [
        {
          label: "2602.4 final What's New / Product Assistance",
          source: "SAP Community final 2602.4 announcement plus SAP Help Portal search results for SAP S/4HANA Cloud Public Edition 2602.4 (HFC12), dated 26 June 2026.",
          summary: "SAP announced that final What's New information and final Product Assistance for SAP S/4HANA Cloud Public Edition 2602.4 are available. SAP Help exposes 54 official 2602.4 (HFC12) What's New entries, which provide a broader product-change view alongside the HFC13 hotfix correction PDF.",
          items: [
            "Tracked topics include Developer Extensibility for scheduling goods issue for deliveries, Explore Migration Objects enhancements, Joule features, project/work-package details, electronic invoicing, withholding-tax analysis, BOM print preview, quality inspection, and logistics/compliance updates.",
            "SAP recommends using RASD for a personalized view based on activated and used scope; the announcement says the 2602.4 information would be available in RASD within the next few days.",
            "Use this as the product-assistance layer for the current 2602 maintenance cycle; SAP Note 3646210 remains the HFC13 correction list.",
            "The search-result row set is being hashed so future changes are detected even if SAP keeps the same visible date."
          ]
        }
      ]
    },
    {
      id: "2026-W27",
      week: "2026-W27",
      title: "W27 HANA prep",
      category: "prep",
      displayTime: "Sun 2026-07-05, 01:00-05:00 AEST",
      start: "2026-07-05T01:00:00+10:00",
      end: "2026-07-05T05:00:00+10:00",
      systems: "HANA database / technical preparation",
      description: "HANA database / technical preparation watch window shown before 2608.",
      outlook: "Created as a free calendar item with a 12-hour reminder.",
      detailWatch: {
        status: "watching",
        label: "Operational announcement watch",
        summary: "HANA database upgrade preparation details are expected through SAP for Me / Cloud ALM availability announcements rather than a hotfix correction PDF.",
        expectedSource: "SAP for Me Cloud Service Availability notifications, SAP Cloud ALM status events, and the SAP 3-system landscape schedule PDF.",
        nextAction: "Hourly check for updated announcement text, completion notices, or changed downtime wording."
      }
    },
    {
      id: "2026-W28-RELEASE-PLANNING",
      week: "2026-W28",
      title: "2608 APJ release planning",
      category: "prep",
      displayTime: "Wed 2026-07-08, 13:00-14:00 AEST",
      start: "2026-07-08T13:00:00+10:00",
      end: "2026-07-08T14:00:00+10:00",
      systems: "SAP Cloud ERP / SAP S/4HANA Cloud Public Edition",
      description: "SAP Preferred Success APJ release planning session for SAP Cloud ERP 2608. SAP says the session covers 2608 release dates, the upgrade process, the new system maintenance schedule starting from September, RASD impact analysis, and release call-to-action items.",
      outlook: "Added to the downloadable .ics calendar with a 12-hour reminder.",
      detailWatch: {
        status: "scheduled",
        label: "Preferred Success APJ session",
        summary: "SAP Preferred Success has published a 2608 APJ release planning session for July 8, 13:00-14:00 AEST. The page is relevant because it explicitly covers release dates, upgrade process, the new maintenance schedule from September, RASD, and actionable next steps.",
        expectedSource: "SAP Preferred Success release planning page, SAP Learning Hub registration, and any follow-up session materials or Outlook invitations.",
        nextAction: "Check for changed session time, registration updates, follow-up materials, or new call-to-action items."
      },
      productUpdates: [
        {
          label: "2608 release planning session",
          source: "SAP Community Preferred Success post, published 1 June 2026.",
          summary: "APJ English session is listed for July 8, 13:00-14:00 AEST for SAP Cloud ERP with SAP Preferred Success subscription customers.",
          items: [
            "Use this session to validate the 2608 upgrade timeline against the maintenance-watch calendar.",
            "Capture any September maintenance-schedule changes and RASD action items that SAP presents.",
            "Registration is via SAP Learning Hub from the SAP Community post."
          ]
        }
      ]
    },
    {
      id: "2026-W29",
      week: "2026-W29",
      title: "2608 Test upgrade",
      category: "upgrade",
      displayTime: "Sat 2026-07-18 22:00-Sun 2026-07-19 02:00 AEST",
      start: "2026-07-18T22:00:00+10:00",
      end: "2026-07-19T02:00:00+10:00",
      systems: "Test systems",
      description: "2608 major upgrade for Test systems. SAP's 2608 upgrade guidance indicates T-Tenant upgrades to 2608 with HFC02 on 18-19 July 2026. SAP has also published preliminary 2608 What's New and Product Assistance guidance for upgrade preparation through the What's New Viewer and RASD, plus Early Release Series sessions on 13-17 July 2026. Customer action now tracked: SAP's IAM guidance says successor IAM apps should be checked, activated, tested, and transported before the 2608 upgrade where predecessor apps are used. RASD 2026 guidance adds change-history filtering and direct navigation to affected S/4HANA apps. Newly tracked product updates add BTP ABAP Environment pre-upgrade testing, Explore Migration Objects 2602.4/2608 changes, Project Billing account-type checks for revenue and sales-deduction G/L accounts, Treasury Business Partner workflow controls, dynamic fiscal-period determination for EBRR period-end close jobs, decentralized EWM/QM integration for SAP Cloud ERP two-tier scenarios, clean-core wrapper guidance, outbound-delivery stock-warning custom logic, API-created delivery stock-shortage handling, EPPM custom value types, Origin Profit Centers, CBC 5-country rollout planning, and additional ERP feed signals for sales extensibility, EBRR scheduling, and Joule/two-tier planning.",
      outlook: "Created as a free calendar item with a 12-hour reminder.",
      detailWatch: {
        status: "pending",
        label: "2608 T-Tenant upgrade detail",
        summary: "T-Tenant upgrade is expected to move to 2608 with HFC02. Preliminary 2608 What's New and Product Assistance content is available for review. The Early Release Series runs 13-17 July 2026 and includes Extensibility, Finance, SAP Activate, Cloud ALM, and Test Automation Tool topics. A tracked IAM customer-action signal recommends checking and activating successor IAM apps before 2608. SAP's RASD 2026 guidance adds change-history filtering and direct navigation from impact cards to Custom CDS Views, Manage Business Role Changes After Upgrade, and tenant-specific S/4HANA apps. SAP also published BTP ABAP Environment pre-upgrade testing guidance, Explore Migration Objects 2602.4/2608 changes, a Project Billing account-type check that excludes revenue and sales-deduction G/L postings from Project Billing, Treasury Business Partner workflow controls for sensitive counterparty/payment data changes, dynamic fiscal-period determination for EBRR period-end close jobs, decentralized EWM/QM integration for SAP Cloud ERP two-tier scenarios, clean-core wrapper guidance, outbound-delivery stock-warning custom logic, API-created delivery stock-shortage handling, EPPM custom value types, Origin Profit Centers, CBC 5-country rollout planning, and additional ERP feed updates for sales extensibility, EBRR scheduling, and Joule/two-tier planning. The full HFC02 correction attachment is still pending until SAP publishes the 2608 patch collection note.",
        expectedSource: "SAP 2608 upgrade guidance, SAP Help 2608 preview, preliminary 2608 What's New / Product Assistance, RASD 2026 guidance, Early Release Series, IAM successor app guidance, BTP ABAP Environment 2608 pre-upgrade guidance, Explore Migration Objects 2602.4/2608 update, Project Billing account-type check guidance, Treasury Business Partner workflow-control guidance, EBRR dynamic fiscal-period guidance, decentralized EWM/QM integration update, clean-core wrapper guidance, outbound-delivery custom-logic guidance, API delivery stock-shortage guidance, EPPM custom-value-type guidance, Origin Profit Center guidance, CBC 5-country rollout guidance, SAP Community ERP product update feed, future SAP S/4HANA Cloud Public Edition 2608 Patch Collection Information Note, SAP for Me / Cloud ALM upgrade announcements.",
        expectedFrom: "2026-07-15",
        nextAction: "Hourly check for the 2608 SAP Note number, HFC02 attachment, RASD link, and any updated customer activities."
      },
      customerActions: [
        {
          label: "2608 IAM successor app activation",
          status: "Action required",
          source: "SAP Community IAM app activation guidance; SAP Note 2975653 referenced by SAP as the central IAM change overview.",
          summary: "From SAP S/4HANA Cloud Public Edition 2602, newly delivered IAM apps are inactive by default. Before 2608, check whether Fortescue roles use predecessor apps, activate the relevant successor IAM apps, validate with key users, then transport role changes to Test and Production.",
          items: [
            "Use IAM Information System, Display IAM Apps, or Manage Business Role Changes After Upgrade to identify predecessor/successor relationships and affected business roles.",
            "Activate successor IAM apps in Maintain Business Roles or by Mass Change, then maintain any new restriction types and catalog/page impacts.",
            "After validation, deactivate deprecated predecessor apps where appropriate and update role documentation, launchpad pages, filters, and end-user communications.",
            "Priority successor IAM app IDs called out by SAP include F3516A_TRAN, F3425A_TRAN, F1443B_TRAN, F3883A_TRAN, F3915A_TRAN, F7280A_TRAN, F0956B_TRAN, and F9104_TRAN."
          ]
        }
      ],
      productUpdates: [
        {
          label: "2608 workflow approval controls",
          source: "SAP Community product update for SAP S/4HANA Cloud Public Edition 2608.",
          summary: "SAP published a 2608 product update for flexible workflow: multi-processor task completion enables two- or three-person approvals, supports independent four-eyes/six-eyes controls, and adds validation callbacks to block invalid workflow activation.",
          items: [
            "Review affected approval workflows using Manage Workflow after the 2608 upgrade.",
            "Test multi-processor approval scenarios with concrete users, teams, substitution, and forwarding cases.",
            "Use workflow simulation and excluded-agent design where initiator/approver separation is required."
          ]
        },
        {
          label: "RASD 2026 impact tracking",
          source: "SAP Community RASD 2026 product update, modified 23 June 2026.",
          summary: "SAP's Release Assessment and Scope Dependency update explains 2026 enhancements intended to reduce Day 1 upgrade impact: What’s New change history, Last Modified On filtering, customer-name display, and cross-navigation from impact cards into affected S/4HANA Cloud apps.",
          items: [
            "Use the What’s New Viewer change history and Last Modified On filter to focus on entries updated after the last review date.",
            "Review RASD impact cards for deleted or changed extensibility objects, where-used lists, impacted business catalogs, IAM apps, and renamed app tiles.",
            "Use direct navigation from RASD to Custom CDS Views and Manage Business Role Changes After Upgrade where available."
          ]
        },
        {
          label: "BTP ABAP Environment 2608 pre-upgrade option",
          source: "SAP Community product update, published 12 June 2026 and modified 19 June 2026.",
          summary: "SAP says SAP BTP ABAP Environment customers or partners can nominate existing systems for an optional 2608 pre-upgrade to test custom-built apps before the standard 2608 upgrade. The stated pre-upgrade window is 17 July, 08:00-16:00 CET, which is 17 July 17:00 to 18 July 01:00 AEST if SAP's CET label is interpreted literally.",
          items: [
            "SAP recommends nominating a non-development system, such as a test system; production nomination is not meaningful for this purpose.",
            "The pre-upgrade is planned on HFC02, with HFC03 imported about two weeks later during the test phase.",
            "The standard SAP BTP ABAP Environment 2608 upgrade is planned for 15/16 August and is planned on HFC04.",
            "Use this as a side-by-side extension readiness check for custom apps built on SAP BTP ABAP Environment."
          ]
        },
        {
          label: "Explore Migration Objects 2602.4/2608 update",
          source: "SAP Community product update, published 8 June 2026 and modified 23 June 2026.",
          summary: "SAP's Explore Migration Objects app update adds 2602.4 and 2608 features for migration planning: a migration-object Availability column, a scope-item Status column, and an enhanced dependency graph.",
          items: [
            "Use the new Availability column and quick filter to see which migration objects are available for the activated scope.",
            "Review scope-item status and dependencies where migration-object visibility depends on scope, feature toggles, or business functions.",
            "Use this before the 2608 upgrade when validating migration cockpit readiness or project data-load planning."
          ]
        },
        {
          label: "Asset Management autonomous agents",
          source: "SAP Community product update, published 26 June 2026 and modified 27 June 2026.",
          summary: "SAP published an Asset Management update for SAP S/4HANA Cloud Public Edition describing a move from reactive maintenance toward AI-assisted and autonomous maintenance operations.",
          items: [
            "Maintenance supervisors: AI is described for grouping, deduplicating, and prioritizing large volumes of notifications.",
            "Maintenance planners: AI is described for synthesizing fragmented asset data and recommending planning decisions.",
            "Maintenance technicians: SAP describes photo-assisted defect reporting and AI-created maintenance notifications to reduce administration."
          ]
        },
        {
          label: "EWM/QM two-tier warehouse integration",
          source: "SAP Community product update, published 26 June 2026.",
          summary: "SAP published a two-tier ERP update for decentralized SAP EWM integration with SAP Cloud ERP where quality inspection is executed directly in EWM using the Quality Inspection Engine, with stock status synchronized back to SAP Cloud ERP.",
          items: [
            "Review inbound delivery distribution from SAP Cloud ERP to decentralized EWM for inspection-relevant goods receipts.",
            "Validate Quality Inspection Engine inspection rules, inspection object types, follow-up actions, and stock-type mapping for accepted, rejected, and exception outcomes.",
            "Use this as a supply-chain readiness topic for sites using decentralized EWM and quality inspection close to warehouse execution."
          ]
        },
        {
          label: "Clean-core wrapper interface design",
          source: "SAP Community extensibility guidance, published 25 June 2026.",
          summary: "SAP published wrapper-interface guidance for clean-core extensibility in SAP S/4HANA, focused on encapsulating classic APIs and internal objects behind stable ABAP Cloud-friendly contracts.",
          items: [
            "Use wrapper interfaces to reduce direct dependency on classic APIs such as BAPIs.",
            "Expose only required parameters and results through released interfaces.",
            "Review custom ABAP Cloud extensions for upgrade-stable interface boundaries before 2608 regression testing."
          ]
        },
        {
          label: "Outbound-delivery stock-warning custom logic",
          source: "SAP Community extensibility guidance from RSS feed, published 24 June 2026; direct article retry returned 503 during this check.",
          summary: "SAP published a custom-logic example for SAP S/4HANA Cloud that checks stock during outbound delivery creation and raises a warning when quantity is insufficient, including API-message considerations.",
          items: [
            "Example BAdI called out by SAP: LE_SHP_DELIVERY_FINAL_CHECK for final checks before delivery save.",
            "The scenario compares sales-order item quantity with current stock and returns a warning for insufficient quantity.",
            "Review API-created outbound delivery behavior separately because front-end warnings and API messages can differ."
          ]
        },
        {
          label: "API-created delivery stock-shortage handling",
          source: "SAP Community extensibility guidance, published 25 June 2026.",
          summary: "SAP published an API-specific outbound-delivery example for SAP S/4HANA Cloud where insufficient stock can cause the API to create a delivery with available stock and leave the external system inconsistent unless custom logic handles the message path.",
          items: [
            "Method 1 uses BAdI LE_SHP_SAVE_DOCUMENT_PREPARE to set delivery custom field YY1_Message when stock is below the sales-order item quantity.",
            "Method 2 uses BAdI LE_SHP_DELIVERY_FINAL_CHECK for final save checks; SAP notes that API-created delivery scenarios can ignore warnings, so error handling may be needed.",
            "Review integrations that create outbound deliveries by API and assume warning messages are visible or blocking."
          ]
        },
        {
          label: "EPPM financial-planning custom value types",
          source: "SAP Community product update, published 24 June 2026.",
          summary: "SAP published EPPM financial-planning guidance for separating business-specific cost splits such as CAPEX and OPEX by introducing custom value types and mapping them in integration customizing.",
          items: [
            "Review whether project financial planning needs dimensions beyond standard View, Category, Group, Cost Element, Cost Center, Activity Type, and CO Version.",
            "SAP describes custom value types such as CAPEX/OPEX and implementation through BAdI RPM_FICO_INT.",
            "For split-instance landscapes, SAP says custom value types need configuration on both EPPM and Project System sides."
          ]
        },
        {
          label: "Origin Profit Centers for project margin",
          source: "SAP Community product update, published 18 June 2026.",
          summary: "SAP describes Origin Profit Center as a Universal Journal attribute for tracking project margin by both responsible and contributing profit centers, supporting cross-project ownership reporting.",
          items: [
            "Review professional-services and project-margin reporting where contributors belong to profit centers different from the responsible project profit center.",
            "SAP says the attribute is derived from the employee's assigned cost center and stored in ACDOCA.",
            "Assess reporting and allocation logic that expects only responsible profit center visibility."
          ]
        },
        {
          label: "CBC 5-country rollout planning",
          source: "SAP Community Central Business Configuration guidance, published 22 June 2026.",
          summary: "SAP published guidance for SAP Central Business Configuration in SAP S/4HANA Cloud Public Edition explaining the 5-country delta rule for scope extensions, country additions, and main-line / parallel-line merge or rebase planning.",
          items: [
            "Any system change in CBC, including scope extension and country addition, cannot create a country delta greater than five countries.",
            "Large rollouts should be phased, for example 5 plus 5 plus 2 countries instead of a single 12-country addition.",
            "Review merge and rebase plans where the main line and parallel line have diverged by more than five countries."
          ]
        },
        {
          label: "Advanced down payment with milestone billing",
          source: "SAP Community product update, published 24 June 2026.",
          summary: "SAP published a Sales Billing update for SAP S/4HANA Cloud Public Edition combining Advanced Down Payment Processing with milestone billing.",
          items: [
            "The update introduces Milestone Billing with Down Payment Requests for order-related milestone billing.",
            "SAP references scope item 7Z1 for Sales Order Processing with Milestone Billing and contrasts it with delivery-related down-payment processing.",
            "Relevant review area: sales billing, customer down payments, settlement invoices, and order-related billing scenarios."
          ]
        },
        {
          label: "Project Billing revenue and sales-deduction check",
          source: "SAP Community product update, published 14 May 2026.",
          summary: "SAP says that with SAP S/4HANA Cloud Public Edition 2608, Project Billing applies a standardized billing-relevance check for project-related journal entries. Postings to G/L accounts with Cost Element Category 11 (Revenues) or 12 (Sales Deduction) are excluded from Project Billing processes.",
          items: [
            "The check applies across Project Billing entry points, including the Manage Project Billing app and Project Billing APIs.",
            "In 2602.3, SAP delivered the behavior through feature toggle PROJ_BILLG_ACCOUNT_TYPE_CHECK for impact analysis and configuration adaptation.",
            "For 2608, the feature toggle is delivered enabled by default, and customers can temporarily disable it during the transition window if needed.",
            "Review project billing configuration, billable-cost expectations, and any journal-entry patterns using revenue or sales-deduction accounts before the Test upgrade."
          ]
        },
        {
          label: "Treasury Business Partner workflow controls",
          source: "SAP Community Financial Management product update for SAP Cloud ERP release 2608.",
          summary: "SAP describes planned workflow-based controls for Treasury Business Partner data in SAP Cloud ERP 2608, focused on approval traceability, segregation of duties, and four-eyes governance for sensitive counterparty and payment-relevant data.",
          items: [
            "Review treasury counterparty, bank detail, standing instruction, and payment-relevant Business Partner change processes.",
            "Validate who can create or change sensitive treasury Business Partner data and who approves those changes.",
            "Check downstream impact for confirmations, settlements, payment initiation, and correspondence processes.",
            "Use this as a finance/treasury readiness topic alongside the broader 2608 workflow approval changes."
          ]
        },
        {
          label: "EBRR dynamic fiscal-period close jobs",
          source: "SAP Community product update, published 22 June 2026 and modified 26 June 2026.",
          summary: "SAP says SAP S/4HANA Cloud Public Edition 2608 adds dynamic determination of the To Fiscal Period/Year for Event-Based Revenue Recognition period-end close jobs, reducing static-period scheduling errors and supporting multi-ledger fiscal-year variants.",
          items: [
            "Review recurring EBRR period-end close jobs that currently use a fixed To Fiscal Period/Year.",
            "Validate whether Current Fiscal Period or Previous Fiscal Period matches month-end and start-of-period close schedules.",
            "Test multi-company-code and multi-ledger jobs where fiscal-year variants differ.",
            "SAP lists the supported jobs as Run Revenue Recognition - Sales Orders (F4276), Projects (F4277), Service Documents (F4278), Provider Contracts (F5405), and Revenue Contracts (F7347)."
          ]
        },
        {
          label: "Additional ERP feed product signals",
          source: "SAP Community ERP Blog Posts by SAP RSS feed, checked 1 July 2026 03:59 AEST.",
          summary: "The public ERP feed exposed additional SAP S/4HANA Cloud Public Edition product/extensibility updates relevant to 2608 readiness review, even though they are not separate maintenance windows. Several items have now been split into dedicated cards; the sales-order BAdI article was modified on 29 June 2026 with more implementation detail. SAP's SAP Cloud ERP Business AI concept article was updated again on 1 July 2026 AEST, still describing the shift from embedded assistants toward role- and process-aware agents and skills.",
          items: [
            "Sales extensibility: BAdI SD_SLS_END_OF_FINALIZE runs at the end of the sales-order Finalize phase and can maintain a human-readable issue-summary custom field on sales orders before save.",
            "Implementation details now tracked: custom field YY1_ISSUE_SUMMARY_SDH, enhancement spot ES_SD_SLS_DEV_EXTEND, method IF_SD_SLS_END_OF_FINALIZE~MODIFY_FIELDS, simulation-mode skip logic, and the generated control flag needed for writes.",
            "EBRR scheduling: company-code and ledger ranges can reduce one-job-per-company-code or one-job-per-ledger scheduling patterns.",
            "EBRR project-based sales: External Revenue Recognition Key Derivation is described for CFD 2602.3 across EPPM, SD, and EBRR integration.",
            "Two-tier planning/Joule: SAP published cross-tier flexible constraint visibility and cross-ATP check concepts for availability commitments across headquarters and subsidiary ERP tiers.",
            "Business AI / agents: SAP updated the Chinese-language SAP Cloud ERP product article on 1 July 2026 AEST; it continues to describe the Assistant, Agent, and Skill model for process-aware AI coordination after SAP Sapphire 2026, with no maintenance-window or customer-action date change detected."
          ]
        }
      ]
    },
    {
      id: "2026-W31",
      week: "2026-W31",
      title: "2608 Starter / other upgrade",
      category: "upgrade",
      displayTime: "Sat 2026-08-01 22:00-Sun 2026-08-02 22:00 AEST",
      start: "2026-08-01T22:00:00+10:00",
      end: "2026-08-02T22:00:00+10:00",
      systems: "Starter and other systems",
      description: "2608 major upgrade for Starter and other systems. SAP's 2608 upgrade guidance indicates other tenants upgrade with HFC03 on 1-2 August 2026, and T-Tenant receives HFC03 for new feature preview. Preliminary 2608 What's New content is now a preparation source. Continue tracking the IAM successor app customer action and RASD impact cards before this upgrade weekend.",
      outlook: "Created as a free calendar item with a 12-hour reminder.",
      detailWatch: {
        status: "pending",
        label: "2608 HFC03 upgrade detail",
        summary: "Starter, sandbox, evaluation, and other tenants are expected to upgrade with HFC03. T-Tenant is also expected to receive HFC03 at this point to preview features before D/P tenants move to HFC03+. Preliminary What's New and RASD should be used to identify scope-specific review items before the weekend, including change-history deltas and impact-card navigation. The IAM successor app activation check remains an active customer action.",
        expectedSource: "SAP Help 2608 preview, preliminary 2608 What's New / Product Assistance, RASD 2026 guidance, IAM successor app guidance, future SAP S/4HANA Cloud Public Edition 2608 Patch Collection Information Note, SAP for Me announcements, and Cloud ALM status events.",
        expectedFrom: "2026-07-15",
        nextAction: "Hourly check for HFC03 details, RASD impacts, new feature preview wording, and any date or downtime wording changes."
      }
    },
    {
      id: "2026-W33-DEV",
      week: "2026-W33",
      title: "2608 Development upgrade",
      category: "upgrade",
      displayTime: "Sat 2026-08-15 14:00-18:00 AEST",
      start: "2026-08-15T14:00:00+10:00",
      end: "2026-08-15T18:00:00+10:00",
      systems: "Development systems",
      description: "2608 major upgrade for Development systems. SAP's 2608 upgrade guidance indicates D/P tenants upgrade with HFC03+ on 15-16 August 2026, with T-Tenant receiving HFC03+ in the same weekend. Preliminary 2608 What's New and RASD content should be reviewed before the D/P weekend. IAM successor app activation and RASD impact-card follow-ups should be validated before Development and Production move to 2608.",
      outlook: "Created as a free calendar item with a 12-hour reminder.",
      detailWatch: {
        status: "pending",
        label: "2608 HFC03+ D/P detail",
        summary: "Development systems are expected to upgrade with HFC03+. SAP's 2608 pattern introduces HFCxx+ releases containing critical fixes one week after the base HFC. Preliminary What's New, RASD 2026 guidance, and the IAM successor app activation guidance are active preparation sources for scope-specific changes.",
        expectedSource: "SAP Help 2608 preview, preliminary 2608 What's New / Product Assistance, RASD 2026 guidance, IAM successor app guidance, future 2608 patch collection note, HFC short-description attachments, and SAP for Me / Cloud ALM announcements.",
        expectedFrom: "2026-07-15",
        nextAction: "Hourly check for HFC03+ wording, application correction lists, critical-fix markers, and recommended customer activities."
      }
    },
    {
      id: "2026-W33-PROD",
      week: "2026-W33",
      title: "2608 Production upgrade",
      category: "upgrade",
      displayTime: "Sat 2026-08-15 22:00-Sun 2026-08-16 02:00 AEST",
      start: "2026-08-15T22:00:00+10:00",
      end: "2026-08-16T02:00:00+10:00",
      systems: "Production systems",
      description: "2608 major upgrade for Production systems. SAP's 2608 upgrade guidance indicates D/P tenants upgrade with HFC03+ on 15-16 August 2026, with T-Tenant receiving HFC03+ in the same weekend. Preliminary 2608 What's New and RASD content should be reviewed before the D/P weekend. Production readiness now explicitly includes IAM successor app activation checks and RASD impact-card follow-up.",
      outlook: "Created as a free calendar item with a 12-hour reminder.",
      detailWatch: {
        status: "pending",
        label: "2608 HFC03+ production detail",
        summary: "Production systems are expected to upgrade with HFC03+. This is the highest-priority watch item for HFC03+ critical fixes, customer activities, completion updates, scope-specific RASD preparation items, and IAM successor app activation readiness.",
        expectedSource: "SAP Help 2608 preview, preliminary 2608 What's New / Product Assistance, RASD 2026 guidance, IAM successor app guidance, future 2608 patch collection note, HFC short-description attachments, SAP for Me / Cloud ALM announcements, and upgrade emails.",
        expectedFrom: "2026-07-15",
        nextAction: "Hourly check for HFC03+ details, production-impact wording, recommended activities, and any completion or delay updates."
      }
    },
    {
      id: "2026-W34",
      week: "2026-W34",
      title: "Backup upgrade weekend",
      category: "upgrade",
      displayTime: "Weekend of 2026-08-22/23",
      start: "2026-08-22T00:00:00+10:00",
      end: "2026-08-24T00:00:00+10:00",
      systems: "Systems not upgraded earlier",
      description: "Backup upgrade weekend if SAP needs it for systems not upgraded earlier.",
      outlook: "Created as an all-day free calendar item with a 1-day reminder.",
      detailWatch: {
        status: "watching",
        label: "Exception-only watch",
        summary: "The backup weekend is only used for systems not upgraded during the original upgrade weekends. There may be no correction PDF unless SAP announces a specific affected system.",
        expectedSource: "SAP for Me / Cloud ALM system-specific announcements and upgrade completion or exception emails.",
        nextAction: "Hourly check for any Fortescue-specific backup-weekend announcement, cancellation, or changed system scope."
      }
    },
    {
      id: "2026-W35",
      week: "2026-W35",
      title: "Post-upgrade hotfix",
      category: "maintenance",
      displayTime: "Sun 2026-08-30, 01:00-05:00 AEST",
      start: "2026-08-30T01:00:00+10:00",
      end: "2026-08-30T05:00:00+10:00",
      systems: "Post-upgrade estate",
      description: "Post-upgrade hotfix / patching watch window.",
      outlook: "Created as a free calendar item with a 12-hour reminder.",
      detailWatch: {
        status: "pending",
        label: "Post-upgrade HFC detail pending",
        summary: "This post-upgrade patching window should be matched to the published 2608 HFC level once SAP publishes the 2608 patch collection note and attachments.",
        expectedSource: "Future 2608 patch collection note, HFC short-description attachments, SAP for Me / Cloud ALM HFC announcements.",
        expectedFrom: "2026-07-15",
        nextAction: "Hourly check for the exact HFC code, correction list, and whether the window remains required after upgrade completion."
      }
    },
    {
      id: "2026-W37",
      week: "2026-W37",
      title: "Standard maintenance / hotfix",
      category: "maintenance",
      displayTime: "Sun 2026-09-13, 01:00-05:00 AEST",
      start: "2026-09-13T01:00:00+10:00",
      end: "2026-09-13T05:00:00+10:00",
      systems: "After 2608 pattern change",
      description: "Standard maintenance / hotfix watch window after the 2608 pattern change.",
      outlook: "Created as a free calendar item with a 12-hour reminder.",
      detailWatch: {
        status: "pending",
        label: "Standard maintenance detail pending",
        summary: "This is the first standard maintenance / hotfix watch window after the 2608 pattern change. SAP's 2608 pattern indicates D/P tenants receive HFCxx+ critical-fix releases while T/other tenants may receive the base HFC earlier.",
        expectedSource: "2608 patch collection note, SAP for Me / Cloud ALM maintenance announcements, and HFC attachments when published.",
        nextAction: "Hourly check for exact HFC/HFC+ code, correction/update wording, customer activities, and window changes."
      }
    },
    {
      id: "2026-W39",
      week: "2026-W39",
      title: "Online software change",
      category: "change",
      displayTime: "Sun 2026-09-27, 01:00-05:00 AEST",
      start: "2026-09-27T01:00:00+10:00",
      end: "2026-09-27T05:00:00+10:00",
      systems: "Continuous delivery",
      description: "Online software change / continuous delivery watch window.",
      outlook: "Created as a free calendar item with a 12-hour reminder.",
      detailWatch: {
        status: "watching",
        label: "Continuous delivery watch",
        summary: "Online software change details are expected through What's New, Preliminary What's New, RASD, and SAP for Me / Cloud ALM announcement text. SAP's 2608 pattern adds online software change weekends alongside standard maintenance and optional urgent maintenance.",
        expectedSource: "What's New Viewer, Preliminary What's New, Release Assessment / Scope Dependency, SAP for Me / Cloud ALM announcements.",
        nextAction: "Hourly check for released or upcoming feature/update detail and any customer action flags."
      }
    },
    {
      id: "2026-W41",
      week: "2026-W41",
      title: "Standard maintenance / hotfix",
      category: "maintenance",
      displayTime: "Sun 2026-10-11, 02:00-06:00 AEDT",
      start: "2026-10-11T02:00:00+11:00",
      end: "2026-10-11T06:00:00+11:00",
      systems: "Monthly maintenance",
      description: "Standard maintenance / hotfix watch window.",
      outlook: "Created as a free calendar item with a 12-hour reminder.",
      detailWatch: {
        status: "pending",
        label: "Standard maintenance detail pending",
        summary: "Monthly standard maintenance details will be tied to the current 2608 HFC level once SAP publishes the relevant note update and announcement.",
        expectedSource: "2608 patch collection note, HFC short-description attachments, SAP for Me / Cloud ALM announcements.",
        nextAction: "Hourly check for exact HFC code, correction list, and any changed downtime wording."
      }
    },
    {
      id: "2026-W42",
      week: "2026-W42",
      title: "Online software change",
      category: "change",
      displayTime: "Sun 2026-10-18, 02:00-06:00 AEDT",
      start: "2026-10-18T02:00:00+11:00",
      end: "2026-10-18T06:00:00+11:00",
      systems: "Continuous delivery",
      description: "Online software change / continuous delivery watch window.",
      outlook: "Created as a free calendar item with a 12-hour reminder.",
      detailWatch: {
        status: "watching",
        label: "Continuous delivery watch",
        summary: "Online software change details will be checked against What's New / RASD plus SAP for Me / Cloud ALM announcement text.",
        expectedSource: "What's New Viewer, Preliminary What's New, Release Assessment / Scope Dependency, SAP for Me / Cloud ALM announcements.",
        nextAction: "Hourly check for feature/update detail, affected scope, and customer action flags."
      }
    },
    {
      id: "2026-W45",
      week: "2026-W45",
      title: "Standard maintenance / hotfix",
      category: "maintenance",
      displayTime: "Sun 2026-11-08, 02:00-06:00 AEDT",
      start: "2026-11-08T02:00:00+11:00",
      end: "2026-11-08T06:00:00+11:00",
      systems: "Monthly maintenance",
      description: "Standard maintenance / hotfix watch window.",
      outlook: "Created as a free calendar item with a 12-hour reminder.",
      detailWatch: {
        status: "pending",
        label: "Standard maintenance detail pending",
        summary: "Monthly standard maintenance details will be tied to the current 2608 HFC level once SAP publishes the relevant note update and announcement.",
        expectedSource: "2608 patch collection note, HFC short-description attachments, SAP for Me / Cloud ALM announcements.",
        nextAction: "Hourly check for exact HFC code, correction list, and any changed downtime wording."
      }
    },
    {
      id: "2026-W46",
      week: "2026-W46",
      title: "Online software change",
      category: "change",
      displayTime: "Sun 2026-11-15, 02:00-06:00 AEDT",
      start: "2026-11-15T02:00:00+11:00",
      end: "2026-11-15T06:00:00+11:00",
      systems: "Continuous delivery",
      description: "Online software change / continuous delivery watch window.",
      outlook: "Created as a free calendar item with a 12-hour reminder.",
      detailWatch: {
        status: "watching",
        label: "Continuous delivery watch",
        summary: "Online software change details will be checked against What's New / RASD plus SAP for Me / Cloud ALM announcement text.",
        expectedSource: "What's New Viewer, Preliminary What's New, Release Assessment / Scope Dependency, SAP for Me / Cloud ALM announcements.",
        nextAction: "Hourly check for feature/update detail, affected scope, and customer action flags."
      }
    },
    {
      id: "2026-W49",
      week: "2026-W49",
      title: "Standard maintenance / hotfix",
      category: "maintenance",
      displayTime: "Sun 2026-12-06, 02:00-06:00 AEDT",
      start: "2026-12-06T02:00:00+11:00",
      end: "2026-12-06T06:00:00+11:00",
      systems: "Monthly maintenance",
      description: "Standard maintenance / hotfix watch window.",
      outlook: "Created as a free calendar item with a 12-hour reminder.",
      detailWatch: {
        status: "pending",
        label: "Standard maintenance detail pending",
        summary: "Monthly standard maintenance details will be tied to the current 2608 HFC level once SAP publishes the relevant note update and announcement.",
        expectedSource: "2608 patch collection note, HFC short-description attachments, SAP for Me / Cloud ALM announcements.",
        nextAction: "Hourly check for exact HFC code, correction list, and any changed downtime wording."
      }
    },
    {
      id: "2026-W50",
      week: "2026-W50",
      title: "Online software change",
      category: "change",
      displayTime: "Sun 2026-12-13, 02:00-06:00 AEDT",
      start: "2026-12-13T02:00:00+11:00",
      end: "2026-12-13T06:00:00+11:00",
      systems: "Continuous delivery",
      description: "Online software change / continuous delivery watch window.",
      outlook: "Created as a free calendar item with a 12-hour reminder.",
      detailWatch: {
        status: "watching",
        label: "Continuous delivery watch",
        summary: "Online software change details will be checked against What's New / RASD plus SAP for Me / Cloud ALM announcement text.",
        expectedSource: "What's New Viewer, Preliminary What's New, Release Assessment / Scope Dependency, SAP for Me / Cloud ALM announcements.",
        nextAction: "Hourly check for feature/update detail, affected scope, and customer action flags."
      }
    }
  ]
};

