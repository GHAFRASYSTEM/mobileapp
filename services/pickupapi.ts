import { api } from '@/services/api';

export type Gare = 'Lille Flandres' | 'Lille Europe';
export type PickupStatus = 'pending' | 'assigned' | 'completed' | 'cancelled';

export type PickupRequest = {
  id:                string;
  user_id:           string;
  phone:             string;
  arrival_date:      string; // YYYY-MM-DD
  arrival_time:      string; // HH:mm
  train_number:      string;
  gare:              Gare;
  expected_luggage:  string | null;
  house_address:     string;
  photo_url:         string | null; // storage path, not directly viewable
  ticket_photo_url:  string | null; // storage path, not directly viewable
  photo_signed_url:  string | null; // short-lived, viewable — use this to render
  ticket_signed_url: string | null; // short-lived, viewable — use this to render
  status:            PickupStatus;
  assigned_to:       string | null;
  admin_notes:       string | null;
  created_at:        string;
  updated_at:        string;
};

export type PickupFormInput = {
  phone:            string;
  arrival_date:     string;
  arrival_time:     string;
  train_number:     string;
  gare:             Gare;
  expected_luggage?: string;
  house_address:    string;
  photo_url?:       string;
  ticket_photo_url?: string;
};

export type UploadUrlResponse = {
  path:       string;
  signed_url: string;
  token:      string;
};

export const pickupApi = {
  // ── 1. Ask the backend for a place to upload a photo ────────────────────
  async getUploadUrl(kind: 'photo' | 'ticket', filename: string): Promise<UploadUrlResponse> {
    return api.post<UploadUrlResponse>('/pickup/upload-url', { kind, filename });
  },

  // ── 2. Upload the file straight to Supabase Storage using that URL ──────
  // Returns the storage `path` to send back with the pickup request.
  async uploadPhoto(kind: 'photo' | 'ticket', fileUri: string, filename: string): Promise<string> {
    const { path, signed_url } = await pickupApi.getUploadUrl(kind, filename);

    const response  = await fetch(fileUri);
    const blob      = await response.blob();

    const uploadRes = await fetch(signed_url, {
      method: 'PUT',
      headers: { 'Content-Type': blob.type || 'image/jpeg' },
      body: blob,
    });

    if (!uploadRes.ok) {
      throw new Error(`Photo upload failed (${uploadRes.status})`);
    }

    return path;
  },

  // ── 3. CRUD on the pickup request itself ────────────────────────────────
  async submit(input: PickupFormInput): Promise<PickupRequest> {
    return api.post<PickupRequest>('/pickup', input);
  },

  async getMine(): Promise<PickupRequest | null> {
    try {
      return await api.get<PickupRequest>('/pickup/me');
    } catch (err: any) {
      if (err?.message?.includes('404') || err?.message?.toLowerCase().includes('not found')) {
        return null;
      }
      throw err;
    }
  },

  async update(input: Partial<PickupFormInput>): Promise<PickupRequest> {
    return api.patch<PickupRequest>('/pickup/me', input);
  },

  async cancel(): Promise<PickupRequest> {
    return api.delete<PickupRequest>('/pickup/me');
  },
};