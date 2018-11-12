export const createShareDBSnapshot = shareDBDoc => ({
  v: shareDBDoc.version,
  data: shareDBDoc.data
});
