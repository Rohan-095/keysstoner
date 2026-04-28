export const fld = {
  width:"100%", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.14)",
  borderRadius:"0.75rem", padding:"0.9rem 1rem", color:"#fff", fontSize:"0.94rem",
  outline:"none", boxSizing:"border-box", fontFamily:"inherit", transition:"border-color .22s, box-shadow .22s",
};

export const selStyle = (v) => ({
  ...fld, color: v ? "#fff" : "rgba(255,255,255,0.38)",
  appearance:"none", WebkitAppearance:"none",
});

export const focusGold = (e) => {
  e.target.style.borderColor = "rgba(230,168,23,0.6)";
  e.target.style.boxShadow   = "0 0 0 3px rgba(230,168,23,0.12)";
};

export const blurGold = (e) => {
  e.target.style.borderColor = "rgba(255,255,255,0.14)";
  e.target.style.boxShadow   = "";
};
