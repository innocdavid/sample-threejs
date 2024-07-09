import { proxy } from 'valtio';

const state = proxy({
  intro: true,
  color: '#ffffff',
  isLogoTexture: true,
  isFullTexture: false,
  shirtDesignerLogoDecal: './adidas.png',
  shirtClubLogoDecal: 'clubLogo.png',
  shirtClubPartnersLogoDecal: './clubPartnerLogo.png',
});

export default state;