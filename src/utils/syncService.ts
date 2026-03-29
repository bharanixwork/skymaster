/**
 * SkyMaster Progress Synchronization Service
 * 
 * Provides cloud-like portability via a unique "Sync Code" system.
 * Encodes student progress (XP, Chapters, Notes, Study List) into or out of 
 * highly portable, persistent strings.
 */

export interface StudentProgress {
  completedSubChapters: string[];
  currentChapterId: string;
  currentSubChapterId: string;
  bookmarks: string[];
  xp: number;
  notes: Record<string, string>;
  streak: number;
  lastActiveDate: string | null;
  studyList?: string[];
}

/**
 * GOOGLE SHEETS CONFIGURATION
 * 1. Open your Spreadsheet.
 * 2. Extensions > Apps Script.
 * 3. Deploy > New Deployment > Web App > Everyone.
 * 4. Paste the URL below.
 */
const APPS_SCRIPT_URL = "YOUR_APPS_SCRIPT_WEB_APP_URL_HERE";

export const syncService = {
  /**
   * Generates a unique, high-fidelity Sync Code from the current progress state.
   */
  generateSyncCode: (progress: StudentProgress, studyList: string[]): string => {
    try {
      const payload = {
        ...progress,
        p: 'skymaster-v1', // Platform identifier
        sl: studyList,
        ts: Date.now()
      };
      
      const json = JSON.stringify(payload);
      const base64 = btoa(encodeURIComponent(json));
      return `SKM-${base64.slice(0, 16).toUpperCase()}-${base64.slice(-16).toUpperCase()}`;
    } catch (error) {
      console.error("Failed to generate sync code:", error);
      return "ERROR-SYNC-GEN";
    }
  },

  /**
   * Reconstructs a full progress object from a given Sync Code.
   */
  loadFromSyncCode: (code: string): { progress: StudentProgress, studyList: string[] } | null => {
    try {
      const cleanCode = code.replace(/^SKM-/, '').replace(/-/g, '').trim();
      if (!cleanCode) return null;
      
      const json = decodeURIComponent(atob(cleanCode));
      const data = JSON.parse(json);
      
      if (data.p === 'skymaster-v1') {
        return {
           progress: {
              completedSubChapters: data.completedSubChapters || [],
              currentChapterId: data.currentChapterId,
              currentSubChapterId: data.currentSubChapterId,
              bookmarks: data.bookmarks || [],
              xp: data.xp || 0,
              notes: data.notes || {},
              streak: data.streak || 0,
              lastActiveDate: data.lastActiveDate || null
           },
           studyList: data.sl || []
        };
      }
      return null;
    } catch (error) {
      console.error("Failed to load sync code:", error);
      return null;
    }
  },

  /**
   * BRIDGE: Google Apps Script Connection
   * Pushes current mission status to your global spreadsheet via simple HTTP POST.
   */
  syncToCloud: async (progress: StudentProgress, studyList: string[]) => {
    const code = syncService.generateSyncCode(progress, studyList);
    
    if (APPS_SCRIPT_URL === "YOUR_APPS_SCRIPT_WEB_APP_URL_HERE") {
       console.warn("CLOUD SYNC: Apps Script URL missing in syncService.ts");
       return;
    }

    try {
       // Send data to the Apps Script endpoint
       const response = await fetch(APPS_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors', // Apps Script requires no-cors for simple Web App deployments
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
             code: code,
             xp: progress.xp,
             progressJson: JSON.stringify(progress)
          })
       });
       
       console.log("Mission Data Projected to Cloud successfully.");
    } catch (err) {
       console.error("Cloud Projection Failure:", err);
    }
  }
};
