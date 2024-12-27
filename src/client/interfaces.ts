// CartoliciousFill -> [r, g, b, alpha, visible]
export type CartoliciousFill = [number, number, number, number, number] | [];
// CartoliciousStroke -> [r, g, b, alpha, visible, width]
export type CartoliciousStroke =
  | [number, number, number, number, number, number]
  | [];
// CartoliciousStyle -> [CartoliciousFill, CartoliciousStroke, visble]
export type CartoliciousStyle = [CartoliciousFill, CartoliciousStroke, 0 | 1];
export type CartoliciousStyles = Map<string, CartoliciousStyle>;

export interface ReduxActionProps {
  type: string;
  payload: any;
}

export interface Curation {
  _id: string;
  name: string;
  style: {
    _id: string;
  };
}

export interface ReduxStateConfigProps {
  background: [number, number, number, number];
  cartolicious_styles: Map<string, CartoliciousStyle> | null;
  busy: boolean;
  style_id: number | null;
  curation_id: number | null;
  sidebar_open: boolean;
  styles_dialog_open: boolean;
  curations_dialog_open: boolean;
  advanced: boolean;
  user: {
    id?: number;
    _id?: string;
    user_id: string | null;
    uid?: string;
    loggedIn: boolean;
    token: string;
    details: any;
    styles: any[];
    curations: Curation[];
  };
}
