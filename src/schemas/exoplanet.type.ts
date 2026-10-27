/**
 * Type definitions for the `pscomppars` table (Planetary Systems Composite
 * Parameters) of the NASA Exoplanet Archive, queried via TAP in JSON format:
 *
 *   https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+*+from+pscomppars&format=json
 *
 * Each row represents ONE confirmed planet. Values are "composite": for each
 * parameter the archive picks the best available value across all publications
 * (or calculates it), so a single planet may mix data from different papers.
 * The origin of each value is given by its `*_solnid` and `*_reflink` fields.
 *
 * Naming convention for measured parameters (e.g. `pl_orbper`):
 *   - `pl_orbper`          value
 *   - `pl_orbpererr1`      upper (+) uncertainty
 *   - `pl_orbpererr2`      lower (−) uncertainty, as a negative value
 *   - `pl_orbpersymerr`    1 = symmetric uncertainty, 0 = asymmetric
 *   - `pl_orbperlim`       limit flag (see `LimitFlag`)
 *   - `pl_orbperstr`       formatted text (may include HTML)
 *   - `pl_orbperformat`    internal format (almost always null)
 *   - `pl_orbper_solnid`   ID of the source solution
 *   - `pl_orbper_reflink`  bibliographic reference as HTML
 *
 * Prefixes: `pl_` = planet, `st_` = host star, `sy_` = system.
 *
 * Note on nullability: apart from identifiers, flags and counts, almost any
 * field can be `null` depending on the planet, so they are typed as `T | null`.
 */

/** Binary flag used by the API: 1 = yes, 0 = no. */
export type Flag = 0 | 1;

/**
 * Limit flag for a parameter:
 * -  0 → regular measured value.
 * -  1 → upper limit (the true value is ≤ the reported one).
 * - -1 → lower limit (the true value is ≥ the reported one).
 *
 * The archive does not enforce these values: at least one row holds another
 * number (`pl_denslim` = 9 for TOI-431 d), so any number must be accepted.
 */
export type LimitFlag = -1 | 0 | 1 | (number & {});

/** Short codes for the discovery method (`disc_method`). */
export type DiscoveryMethodCode =
  | "ast"
  | "dkin"
  | "etv"
  | "ima"
  | "micro"
  | "obm"
  | "ptv"
  | "pul"
  | "rv"
  | "tran"
  | "ttv"
  | (string & {});

/** Full name of the discovery method (`discoverymethod`). */
export type DiscoveryMethod =
  | "Astrometry"
  | "Disk Kinematics"
  | "Eclipse Timing Variations"
  | "Imaging"
  | "Microlensing"
  | "Orbital Brightness Modulation"
  | "Pulsar Timing"
  | "Pulsation Timing Variations"
  | "Radial Velocity"
  | "Transit"
  | "Transit Timing Variations"
  | (string & {});

/** Where the discovery was made from. */
export type DiscoveryLocale = "Ground" | "Space" | "Multiple" | (string & {});

/** Which kind of mass was used as the "best mass" (`pl_bmassprov`). */
export type BestMassProvenance =
  | "Mass"
  | "Msini"
  | "Msin(i)/sin(i)"
  | (string & {});

/** Ratio used to express stellar metallicity (`st_metratio`). */
export type MetallicityRatio = "[Fe/H]" | "[M/H]" | "[m/H]" | (string & {});

/** A row of the `pscomppars` table: all the data for one confirmed exoplanet. */
export interface ExoplanetType {
  // ──────────────────────────────────────────────────────────────────────
  // Identifiers and names
  // ──────────────────────────────────────────────────────────────────────

  /** Internal archive ID of the planetary system. */
  systemid: string;
  /** Name of the planetary system. */
  sy_name: string;
  /** Internal archive ID of the planet. */
  objectid: string;
  /** Planet name (e.g. "55 Cnc b"). The most practical identifier to use as a key. */
  pl_name: string;
  /** Letter of the planet within its system (b, c, d…), assigned in order of discovery. */
  pl_letter: string;
  /** Internal archive ID of the host star. */
  hostid: string;
  /** Name of the host star. */
  hostname: string;
  /** Host star designation in the Henry Draper (HD) catalog. */
  hd_name: string | null;
  /** Host star designation in the Hipparcos (HIP) catalog. */
  hip_name: string | null;
  /** Host star designation in the TESS Input Catalog (TIC). */
  tic_id: string | null;
  /** Host star designation in Gaia Data Release 2. */
  gaia_dr2_id: string | null;
  /** Host star designation in Gaia Data Release 3. */
  gaia_dr3_id: string | null;

  // ──────────────────────────────────────────────────────────────────────
  // Detection flags (1 = the planet was detected/observed with that method)
  // ──────────────────────────────────────────────────────────────────────

  /** Shows transit timing variations (TTV). */
  ttv_flag: Flag;
  /** Shows stellar pulsation timing variations. */
  ptv_flag: Flag;
  /** Detected by the transit method. */
  tran_flag: Flag;
  /** Detected by radial velocity. */
  rv_flag: Flag;
  /** Detected by astrometry. */
  ast_flag: Flag;
  /** Detected by orbital brightness modulation. */
  obm_flag: Flag;
  /** Detected by gravitational microlensing. */
  micro_flag: Flag;
  /** Detected by eclipse timing variations (eclipsing binaries). */
  etv_flag: Flag;
  /** Detected by direct imaging. */
  ima_flag: Flag;
  /** Detected by protoplanetary disk kinematics. */
  dkin_flag: Flag;
  /** Detected by pulsar timing. */
  pul_flag: Flag;
  /** Its existence is disputed in the literature (1 = controversial). */
  pl_controv_flag: Flag;
  /** Circumbinary: it orbits two stars. */
  cb_flag: Flag;

  // ──────────────────────────────────────────────────────────────────────
  // Discovery
  // ──────────────────────────────────────────────────────────────────────

  /** Publication date (YYYY-MM) of the planet parameters. */
  pl_pubdate: string | null;
  /** Publication date of the discovery (YYYY-MM). */
  disc_pubdate: string | null;
  /** Year of discovery. */
  disc_year: number;
  /** Internal ID of the discovery reference. */
  disc_refid: number | null;
  /** Short code of the discovery method (e.g. "rv", "tran"). */
  disc_method: DiscoveryMethodCode | null;
  /** Full name of the discovery method (e.g. "Radial Velocity", "Transit"). */
  discoverymethod: DiscoveryMethod;
  /** Whether the discovery was made from the ground, from space, or both. */
  disc_locale: DiscoveryLocale | null;
  /** Observatory or mission that made the discovery (e.g. "Kepler", "Lick Observatory"). */
  disc_facility: string | null;
  /** Instrument used for the discovery. */
  disc_instrument: string | null;
  /** Telescope used for the discovery. */
  disc_telescope: string | null;
  /** Reference to the discovery paper as an HTML `<a>` link. */
  disc_refname: string | null;

  // ──────────────────────────────────────────────────────────────────────
  // System counts and available data
  // ──────────────────────────────────────────────────────────────────────

  /** Number of stars in the system. */
  sy_snum: number;
  /** Number of confirmed planets in the system. */
  sy_pnum: number;
  /** Number of known moons in the system. */
  sy_mnum: number;
  /** Number of photometric time series for the star in the archive. */
  st_nphot: number;
  /** Number of radial velocity curves for the star in the archive. */
  st_nrvc: number;
  /** Number of stellar spectra in the archive. */
  st_nspec: number;
  /** Number of emission spectra for the planet in the archive. */
  pl_nespec: number;
  /** Number of transmission spectra for the planet in the archive. */
  pl_ntranspec: number;
  /** Number of direct imaging spectra for the planet in the archive. */
  pl_ndispec: number;
  /** Number of notes the archive holds about the planet. */
  pl_nnotes: number;
  /** Number of JWST observations of the planet's transits. */
  pl_nobs_jwst_tran: number;
  /** Number of JWST observations of the planet's eclipses (emission). */
  pl_nobs_jwst_e: number;
  /** Number of JWST direct imaging observations. */
  pl_nobs_jwst_di: number;
  /** Number of JWST phase curve observations of the planet. */
  pl_nobs_jwst_pc: number;

  // ──────────────────────────────────────────────────────────────────────
  // Position on the sky
  // ──────────────────────────────────────────────────────────────────────

  /**
   * Right ascension (J2000) [decimal degrees].
   * `rastr` gives it in sexagesimal format (e.g. "08h52m35.24s").
   */
  ra: number | null;
  /** Upper (+) uncertainty of: right ascension (J2000) [decimal degrees]. */
  raerr1: number | null;
  /** Lower (−) uncertainty of: right ascension (J2000) [decimal degrees]. Expressed as a negative value. */
  raerr2: number | null;
  /** Whether the uncertainty of ra is symmetric: 1 = symmetric, 0 = asymmetric. */
  rasymerr: number | null;
  /**
   * ra formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  rastr: string | null;
  /** ID of the solution (row in the `ps` table) that ra was taken from. `null` if it is a calculated value. */
  ra_solnid: string | null;
  /**
   * Bibliographic reference for ra as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  ra_reflink: string | null;
  /**
   * Declination (J2000) [decimal degrees].
   * `decstr` gives it in sexagesimal format (e.g. "+28d19m47.34s").
   */
  dec: number | null;
  /** Upper (+) uncertainty of: declination (J2000) [decimal degrees]. */
  decerr1: number | null;
  /** Lower (−) uncertainty of: declination (J2000) [decimal degrees]. Expressed as a negative value. */
  decerr2: number | null;
  /** Whether the uncertainty of dec is symmetric: 1 = symmetric, 0 = asymmetric. */
  decsymerr: number | null;
  /**
   * dec formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  decstr: string | null;
  /** ID of the solution (row in the `ps` table) that dec was taken from. `null` if it is a calculated value. */
  dec_solnid: string | null;
  /**
   * Bibliographic reference for dec as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  dec_reflink: string | null;
  /** Galactic longitude [degrees]. */
  glon: number | null;
  /** Upper (+) uncertainty of: galactic longitude [degrees]. */
  glonerr1: number | null;
  /** Lower (−) uncertainty of: galactic longitude [degrees]. Expressed as a negative value. */
  glonerr2: number | null;
  /** Whether the uncertainty of glon is symmetric: 1 = symmetric, 0 = asymmetric. */
  glonsymerr: number | null;
  /**
   * glon formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  glonstr: string | null;
  /** ID of the solution (row in the `ps` table) that glon was taken from. `null` if it is a calculated value. */
  glon_solnid: string | null;
  /**
   * Bibliographic reference for glon as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  glon_reflink: string | null;
  /** Galactic latitude [degrees]. */
  glat: number | null;
  /** Upper (+) uncertainty of: galactic latitude [degrees]. */
  glaterr1: number | null;
  /** Lower (−) uncertainty of: galactic latitude [degrees]. Expressed as a negative value. */
  glaterr2: number | null;
  /** Whether the uncertainty of glat is symmetric: 1 = symmetric, 0 = asymmetric. */
  glatsymerr: number | null;
  /**
   * glat formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  glatstr: string | null;
  /** ID of the solution (row in the `ps` table) that glat was taken from. `null` if it is a calculated value. */
  glat_solnid: string | null;
  /**
   * Bibliographic reference for glat as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  glat_reflink: string | null;
  /** Ecliptic longitude [degrees]. */
  elon: number | null;
  /** Upper (+) uncertainty of: ecliptic longitude [degrees]. */
  elonerr1: number | null;
  /** Lower (−) uncertainty of: ecliptic longitude [degrees]. Expressed as a negative value. */
  elonerr2: number | null;
  /** Whether the uncertainty of elon is symmetric: 1 = symmetric, 0 = asymmetric. */
  elonsymerr: number | null;
  /**
   * elon formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  elonstr: string | null;
  /** ID of the solution (row in the `ps` table) that elon was taken from. `null` if it is a calculated value. */
  elon_solnid: string | null;
  /**
   * Bibliographic reference for elon as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  elon_reflink: string | null;
  /** Ecliptic latitude [degrees]. */
  elat: number | null;
  /** Upper (+) uncertainty of: ecliptic latitude [degrees]. */
  elaterr1: number | null;
  /** Lower (−) uncertainty of: ecliptic latitude [degrees]. Expressed as a negative value. */
  elaterr2: number | null;
  /** Whether the uncertainty of elat is symmetric: 1 = symmetric, 0 = asymmetric. */
  elatsymerr: number | null;
  /**
   * elat formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  elatstr: string | null;
  /** ID of the solution (row in the `ps` table) that elat was taken from. `null` if it is a calculated value. */
  elat_solnid: string | null;
  /**
   * Bibliographic reference for elat as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  elat_reflink: string | null;
  /** Cartesian X coordinate of the unit sky-position vector (internal use for spatial searches). */
  x: number | null;
  /** Cartesian Y coordinate of the unit sky-position vector. */
  y: number | null;
  /** Cartesian Z coordinate of the unit sky-position vector. */
  z: number | null;
  /** Level-20 HTM (Hierarchical Triangular Mesh) index, used to index sky positions. */
  htm20: number | null;

  // ──────────────────────────────────────────────────────────────────────
  // Planet orbit
  // ──────────────────────────────────────────────────────────────────────

  /** Orbital period: the time it takes to complete one orbit around its star [days]. */
  pl_orbper: number | null;
  /** Upper (+) uncertainty of: orbital period: the time it takes to complete one orbit around its star [days]. */
  pl_orbpererr1: number | null;
  /** Lower (−) uncertainty of: orbital period: the time it takes to complete one orbit around its star [days]. Expressed as a negative value. */
  pl_orbpererr2: number | null;
  /** Whether the uncertainty of pl_orbper is symmetric: 1 = symmetric, 0 = asymmetric. */
  pl_orbpersymerr: number | null;
  /** Limit flag for pl_orbper: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  pl_orbperlim: LimitFlag | null;
  /**
   * pl_orbper formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  pl_orbperstr: string | null;
  /** Display format for pl_orbper (internal archive use; almost always `null`). */
  pl_orbperformat: string | null;
  /** ID of the solution (row in the `ps` table) that pl_orbper was taken from. `null` if it is a calculated value. */
  pl_orbper_solnid: string | null;
  /**
   * Bibliographic reference for pl_orbper as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  pl_orbper_reflink: string | null;
  /** Orbit semi-major axis (mean distance from the star) [AU, astronomical units]. */
  pl_orbsmax: number | null;
  /** Upper (+) uncertainty of: orbit semi-major axis (mean distance from the star) [AU, astronomical units]. */
  pl_orbsmaxerr1: number | null;
  /** Lower (−) uncertainty of: orbit semi-major axis (mean distance from the star) [AU, astronomical units]. Expressed as a negative value. */
  pl_orbsmaxerr2: number | null;
  /** Whether the uncertainty of pl_orbsmax is symmetric: 1 = symmetric, 0 = asymmetric. */
  pl_orbsmaxsymerr: number | null;
  /** Limit flag for pl_orbsmax: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  pl_orbsmaxlim: LimitFlag | null;
  /**
   * pl_orbsmax formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  pl_orbsmaxstr: string | null;
  /** Display format for pl_orbsmax (internal archive use; almost always `null`). */
  pl_orbsmaxformat: string | null;
  /** ID of the solution (row in the `ps` table) that pl_orbsmax was taken from. `null` if it is a calculated value. */
  pl_orbsmax_solnid: string | null;
  /**
   * Bibliographic reference for pl_orbsmax as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  pl_orbsmax_reflink: string | null;
  /** Orbital eccentricity: 0 = circular, close to 1 = highly elongated. */
  pl_orbeccen: number | null;
  /** Upper (+) uncertainty of: orbital eccentricity: 0 = circular, close to 1 = highly elongated. */
  pl_orbeccenerr1: number | null;
  /** Lower (−) uncertainty of: orbital eccentricity: 0 = circular, close to 1 = highly elongated. Expressed as a negative value. */
  pl_orbeccenerr2: number | null;
  /** Whether the uncertainty of pl_orbeccen is symmetric: 1 = symmetric, 0 = asymmetric. */
  pl_orbeccensymerr: number | null;
  /** Limit flag for pl_orbeccen: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  pl_orbeccenlim: LimitFlag | null;
  /**
   * pl_orbeccen formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  pl_orbeccenstr: string | null;
  /** Display format for pl_orbeccen (internal archive use; almost always `null`). */
  pl_orbeccenformat: string | null;
  /** ID of the solution (row in the `ps` table) that pl_orbeccen was taken from. `null` if it is a calculated value. */
  pl_orbeccen_solnid: string | null;
  /**
   * Bibliographic reference for pl_orbeccen as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  pl_orbeccen_reflink: string | null;
  /** Orbital inclination relative to the plane of the sky; ~90° means we see it edge-on [degrees]. */
  pl_orbincl: number | null;
  /** Upper (+) uncertainty of: orbital inclination relative to the plane of the sky; ~90° means we see it edge-on [degrees]. */
  pl_orbinclerr1: number | null;
  /** Lower (−) uncertainty of: orbital inclination relative to the plane of the sky; ~90° means we see it edge-on [degrees]. Expressed as a negative value. */
  pl_orbinclerr2: number | null;
  /** Whether the uncertainty of pl_orbincl is symmetric: 1 = symmetric, 0 = asymmetric. */
  pl_orbinclsymerr: number | null;
  /** Limit flag for pl_orbincl: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  pl_orbincllim: LimitFlag | null;
  /**
   * pl_orbincl formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  pl_orbinclstr: string | null;
  /** Display format for pl_orbincl (internal archive use; almost always `null`). */
  pl_orbinclformat: string | null;
  /** ID of the solution (row in the `ps` table) that pl_orbincl was taken from. `null` if it is a calculated value. */
  pl_orbincl_solnid: string | null;
  /**
   * Bibliographic reference for pl_orbincl as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  pl_orbincl_reflink: string | null;
  /** Argument of periastron (orientation of the elliptical orbit) [degrees]. */
  pl_orblper: number | null;
  /** Upper (+) uncertainty of: argument of periastron (orientation of the elliptical orbit) [degrees]. */
  pl_orblpererr1: number | null;
  /** Lower (−) uncertainty of: argument of periastron (orientation of the elliptical orbit) [degrees]. Expressed as a negative value. */
  pl_orblpererr2: number | null;
  /** Whether the uncertainty of pl_orblper is symmetric: 1 = symmetric, 0 = asymmetric. */
  pl_orblpersymerr: number | null;
  /** Limit flag for pl_orblper: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  pl_orblperlim: LimitFlag | null;
  /**
   * pl_orblper formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  pl_orblperstr: string | null;
  /** Display format for pl_orblper (internal archive use; almost always `null`). */
  pl_orblperformat: string | null;
  /** ID of the solution (row in the `ps` table) that pl_orblper was taken from. `null` if it is a calculated value. */
  pl_orblper_solnid: string | null;
  /**
   * Bibliographic reference for pl_orblper as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  pl_orblper_reflink: string | null;
  /** Epoch of periastron: time when the planet passes the point closest to the star [days]. */
  pl_orbtper: number | null;
  /** Upper (+) uncertainty of: epoch of periastron: time when the planet passes the point closest to the star [days]. */
  pl_orbtpererr1: number | null;
  /** Lower (−) uncertainty of: epoch of periastron: time when the planet passes the point closest to the star [days]. Expressed as a negative value. */
  pl_orbtpererr2: number | null;
  /** Whether the uncertainty of pl_orbtper is symmetric: 1 = symmetric, 0 = asymmetric. */
  pl_orbtpersymerr: number | null;
  /** Limit flag for pl_orbtper: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  pl_orbtperlim: LimitFlag | null;
  /**
   * pl_orbtper formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  pl_orbtperstr: string | null;
  /** Display format for pl_orbtper (internal archive use; almost always `null`). */
  pl_orbtperformat: string | null;
  /** ID of the solution (row in the `ps` table) that pl_orbtper was taken from. `null` if it is a calculated value. */
  pl_orbtper_solnid: string | null;
  /**
   * Bibliographic reference for pl_orbtper as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  pl_orbtper_reflink: string | null;
  /** Time system in which pl_orbtper is expressed (e.g. "JD", "BJD"). */
  pl_orbtper_systemref: string | null;
  /** Calculated angular separation between the planet and its star as seen from Earth [mas, milliarcseconds]. */
  pl_angsep: number | null;
  /** Upper (+) uncertainty of: calculated angular separation between the planet and its star as seen from Earth [mas, milliarcseconds]. */
  pl_angseperr1: number | null;
  /** Lower (−) uncertainty of: calculated angular separation between the planet and its star as seen from Earth [mas, milliarcseconds]. Expressed as a negative value. */
  pl_angseperr2: number | null;
  /** Whether the uncertainty of pl_angsep is symmetric: 1 = symmetric, 0 = asymmetric. */
  pl_angsepsymerr: number | null;
  /** Limit flag for pl_angsep: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  pl_angseplim: LimitFlag | null;
  /**
   * pl_angsep formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  pl_angsepstr: string | null;
  /** Display format for pl_angsep (internal archive use; almost always `null`). */
  pl_angsepformat: string | null;
  /** ID of the solution (row in the `ps` table) that pl_angsep was taken from. `null` if it is a calculated value. */
  pl_angsep_solnid: string | null;
  /**
   * Bibliographic reference for pl_angsep as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  pl_angsep_reflink: string | null;

  // ──────────────────────────────────────────────────────────────────────
  // Transit and occultation
  // ──────────────────────────────────────────────────────────────────────

  /** Transit mid-point time (reference epoch for predicting transits) [days]. */
  pl_tranmid: number | null;
  /** Upper (+) uncertainty of: transit mid-point time (reference epoch for predicting transits) [days]. */
  pl_tranmiderr1: number | null;
  /** Lower (−) uncertainty of: transit mid-point time (reference epoch for predicting transits) [days]. Expressed as a negative value. */
  pl_tranmiderr2: number | null;
  /** Whether the uncertainty of pl_tranmid is symmetric: 1 = symmetric, 0 = asymmetric. */
  pl_tranmidsymerr: number | null;
  /** Limit flag for pl_tranmid: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  pl_tranmidlim: LimitFlag | null;
  /**
   * pl_tranmid formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  pl_tranmidstr: string | null;
  /** Display format for pl_tranmid (internal archive use; almost always `null`). */
  pl_tranmidformat: string | null;
  /** ID of the solution (row in the `ps` table) that pl_tranmid was taken from. `null` if it is a calculated value. */
  pl_tranmid_solnid: string | null;
  /**
   * Bibliographic reference for pl_tranmid as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  pl_tranmid_reflink: string | null;
  /** Time system in which pl_tranmid is expressed (e.g. "JD", "BJD"). */
  pl_tranmid_systemref: string | null;
  /** Transit duration [hours]. */
  pl_trandur: number | null;
  /** Upper (+) uncertainty of: transit duration [hours]. */
  pl_trandurerr1: number | null;
  /** Lower (−) uncertainty of: transit duration [hours]. Expressed as a negative value. */
  pl_trandurerr2: number | null;
  /** Whether the uncertainty of pl_trandur is symmetric: 1 = symmetric, 0 = asymmetric. */
  pl_trandursymerr: number | null;
  /** Limit flag for pl_trandur: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  pl_trandurlim: LimitFlag | null;
  /**
   * pl_trandur formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  pl_trandurstr: string | null;
  /** Display format for pl_trandur (internal archive use; almost always `null`). */
  pl_trandurformat: string | null;
  /** ID of the solution (row in the `ps` table) that pl_trandur was taken from. `null` if it is a calculated value. */
  pl_trandur_solnid: string | null;
  /**
   * Bibliographic reference for pl_trandur as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  pl_trandur_reflink: string | null;
  /** Transit depth: how much the star's brightness drops [%]. */
  pl_trandep: number | null;
  /** Upper (+) uncertainty of: transit depth: how much the star's brightness drops [%]. */
  pl_trandeperr1: number | null;
  /** Lower (−) uncertainty of: transit depth: how much the star's brightness drops [%]. Expressed as a negative value. */
  pl_trandeperr2: number | null;
  /** Whether the uncertainty of pl_trandep is symmetric: 1 = symmetric, 0 = asymmetric. */
  pl_trandepsymerr: number | null;
  /** Limit flag for pl_trandep: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  pl_trandeplim: LimitFlag | null;
  /**
   * pl_trandep formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  pl_trandepstr: string | null;
  /** Display format for pl_trandep (internal archive use; almost always `null`). */
  pl_trandepformat: string | null;
  /** ID of the solution (row in the `ps` table) that pl_trandep was taken from. `null` if it is a calculated value. */
  pl_trandep_solnid: string | null;
  /**
   * Bibliographic reference for pl_trandep as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  pl_trandep_reflink: string | null;
  /** Occultation depth (secondary eclipse, when the planet passes behind the star) [%]. */
  pl_occdep: number | null;
  /** Upper (+) uncertainty of: occultation depth (secondary eclipse, when the planet passes behind the star) [%]. */
  pl_occdeperr1: number | null;
  /** Lower (−) uncertainty of: occultation depth (secondary eclipse, when the planet passes behind the star) [%]. Expressed as a negative value. */
  pl_occdeperr2: number | null;
  /** Whether the uncertainty of pl_occdep is symmetric: 1 = symmetric, 0 = asymmetric. */
  pl_occdepsymerr: number | null;
  /** Limit flag for pl_occdep: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  pl_occdeplim: LimitFlag | null;
  /**
   * pl_occdep formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  pl_occdepstr: string | null;
  /** Display format for pl_occdep (internal archive use; almost always `null`). */
  pl_occdepformat: string | null;
  /** ID of the solution (row in the `ps` table) that pl_occdep was taken from. `null` if it is a calculated value. */
  pl_occdep_solnid: string | null;
  /**
   * Bibliographic reference for pl_occdep as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  pl_occdep_reflink: string | null;
  /** Ratio of planet radius to stellar radius (Rp/R*). */
  pl_ratror: number | null;
  /** Upper (+) uncertainty of: ratio of planet radius to stellar radius (Rp/R*). */
  pl_ratrorerr1: number | null;
  /** Lower (−) uncertainty of: ratio of planet radius to stellar radius (Rp/R*). Expressed as a negative value. */
  pl_ratrorerr2: number | null;
  /** Whether the uncertainty of pl_ratror is symmetric: 1 = symmetric, 0 = asymmetric. */
  pl_ratrorsymerr: number | null;
  /** Limit flag for pl_ratror: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  pl_ratrorlim: LimitFlag | null;
  /**
   * pl_ratror formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  pl_ratrorstr: string | null;
  /** Display format for pl_ratror (internal archive use; almost always `null`). */
  pl_ratrorformat: string | null;
  /** ID of the solution (row in the `ps` table) that pl_ratror was taken from. `null` if it is a calculated value. */
  pl_ratror_solnid: string | null;
  /**
   * Bibliographic reference for pl_ratror as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  pl_ratror_reflink: string | null;
  /** Ratio of planet-star distance to stellar radius (a/R*). */
  pl_ratdor: number | null;
  /** Upper (+) uncertainty of: ratio of planet-star distance to stellar radius (a/R*). */
  pl_ratdorerr1: number | null;
  /** Lower (−) uncertainty of: ratio of planet-star distance to stellar radius (a/R*). Expressed as a negative value. */
  pl_ratdorerr2: number | null;
  /** Whether the uncertainty of pl_ratdor is symmetric: 1 = symmetric, 0 = asymmetric. */
  pl_ratdorsymerr: number | null;
  /** Limit flag for pl_ratdor: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  pl_ratdorlim: LimitFlag | null;
  /**
   * pl_ratdor formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  pl_ratdorstr: string | null;
  /** Display format for pl_ratdor (internal archive use; almost always `null`). */
  pl_ratdorformat: string | null;
  /** ID of the solution (row in the `ps` table) that pl_ratdor was taken from. `null` if it is a calculated value. */
  pl_ratdor_solnid: string | null;
  /**
   * Bibliographic reference for pl_ratdor as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  pl_ratdor_reflink: string | null;
  /** Impact parameter: how far from the center of the stellar disk the transit passes (0 = through the center). */
  pl_imppar: number | null;
  /** Upper (+) uncertainty of: impact parameter: how far from the center of the stellar disk the transit passes (0 = through the center). */
  pl_impparerr1: number | null;
  /** Lower (−) uncertainty of: impact parameter: how far from the center of the stellar disk the transit passes (0 = through the center). Expressed as a negative value. */
  pl_impparerr2: number | null;
  /** Whether the uncertainty of pl_imppar is symmetric: 1 = symmetric, 0 = asymmetric. */
  pl_impparsymerr: number | null;
  /** Limit flag for pl_imppar: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  pl_impparlim: LimitFlag | null;
  /**
   * pl_imppar formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  pl_impparstr: string | null;
  /** Display format for pl_imppar (internal archive use; almost always `null`). */
  pl_impparformat: string | null;
  /** ID of the solution (row in the `ps` table) that pl_imppar was taken from. `null` if it is a calculated value. */
  pl_imppar_solnid: string | null;
  /**
   * Bibliographic reference for pl_imppar as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  pl_imppar_reflink: string | null;
  /** Projected obliquity: angle between the orbit and the stellar spin axis, projected on the sky [degrees]. */
  pl_projobliq: number | null;
  /** Upper (+) uncertainty of: projected obliquity: angle between the orbit and the stellar spin axis, projected on the sky [degrees]. */
  pl_projobliqerr1: number | null;
  /** Lower (−) uncertainty of: projected obliquity: angle between the orbit and the stellar spin axis, projected on the sky [degrees]. Expressed as a negative value. */
  pl_projobliqerr2: number | null;
  /** Whether the uncertainty of pl_projobliq is symmetric: 1 = symmetric, 0 = asymmetric. */
  pl_projobliqsymerr: number | null;
  /** Limit flag for pl_projobliq: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  pl_projobliqlim: LimitFlag | null;
  /**
   * pl_projobliq formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  pl_projobliqstr: string | null;
  /** Display format for pl_projobliq (internal archive use; almost always `null`). */
  pl_projobliqformat: string | null;
  /** ID of the solution (row in the `ps` table) that pl_projobliq was taken from. `null` if it is a calculated value. */
  pl_projobliq_solnid: string | null;
  /**
   * Bibliographic reference for pl_projobliq as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  pl_projobliq_reflink: string | null;
  /** True (3D) obliquity between the orbit and the stellar spin axis [degrees]. */
  pl_trueobliq: number | null;
  /** Upper (+) uncertainty of: true (3D) obliquity between the orbit and the stellar spin axis [degrees]. */
  pl_trueobliqerr1: number | null;
  /** Lower (−) uncertainty of: true (3D) obliquity between the orbit and the stellar spin axis [degrees]. Expressed as a negative value. */
  pl_trueobliqerr2: number | null;
  /** Whether the uncertainty of pl_trueobliq is symmetric: 1 = symmetric, 0 = asymmetric. */
  pl_trueobliqsymerr: number | null;
  /** Limit flag for pl_trueobliq: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  pl_trueobliqlim: LimitFlag | null;
  /**
   * pl_trueobliq formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  pl_trueobliqstr: string | null;
  /** Display format for pl_trueobliq (internal archive use; almost always `null`). */
  pl_trueobliqformat: string | null;
  /** ID of the solution (row in the `ps` table) that pl_trueobliq was taken from. `null` if it is a calculated value. */
  pl_trueobliq_solnid: string | null;
  /**
   * Bibliographic reference for pl_trueobliq as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  pl_trueobliq_reflink: string | null;

  // ──────────────────────────────────────────────────────────────────────
  // Planet size, mass and physical properties
  // ──────────────────────────────────────────────────────────────────────

  /** Planet radius [Earth radii]. */
  pl_rade: number | null;
  /** Upper (+) uncertainty of: planet radius [Earth radii]. */
  pl_radeerr1: number | null;
  /** Lower (−) uncertainty of: planet radius [Earth radii]. Expressed as a negative value. */
  pl_radeerr2: number | null;
  /** Whether the uncertainty of pl_rade is symmetric: 1 = symmetric, 0 = asymmetric. */
  pl_radesymerr: number | null;
  /** Limit flag for pl_rade: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  pl_radelim: LimitFlag | null;
  /**
   * pl_rade formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  pl_radestr: string | null;
  /** Display format for pl_rade (internal archive use; almost always `null`). */
  pl_radeformat: string | null;
  /** ID of the solution (row in the `ps` table) that pl_rade was taken from. `null` if it is a calculated value. */
  pl_rade_solnid: string | null;
  /**
   * Bibliographic reference for pl_rade as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  pl_rade_reflink: string | null;
  /** Planet radius [Jupiter radii]. */
  pl_radj: number | null;
  /** Upper (+) uncertainty of: planet radius [Jupiter radii]. */
  pl_radjerr1: number | null;
  /** Lower (−) uncertainty of: planet radius [Jupiter radii]. Expressed as a negative value. */
  pl_radjerr2: number | null;
  /** Whether the uncertainty of pl_radj is symmetric: 1 = symmetric, 0 = asymmetric. */
  pl_radjsymerr: number | null;
  /** Limit flag for pl_radj: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  pl_radjlim: LimitFlag | null;
  /**
   * pl_radj formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  pl_radjstr: string | null;
  /** Display format for pl_radj (internal archive use; almost always `null`). */
  pl_radjformat: string | null;
  /** ID of the solution (row in the `ps` table) that pl_radj was taken from. `null` if it is a calculated value. */
  pl_radj_solnid: string | null;
  /**
   * Bibliographic reference for pl_radj as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  pl_radj_reflink: string | null;
  /** Planet mass (directly measured) [Earth masses]. */
  pl_masse: number | null;
  /** Upper (+) uncertainty of: planet mass (directly measured) [Earth masses]. */
  pl_masseerr1: number | null;
  /** Lower (−) uncertainty of: planet mass (directly measured) [Earth masses]. Expressed as a negative value. */
  pl_masseerr2: number | null;
  /** Whether the uncertainty of pl_masse is symmetric: 1 = symmetric, 0 = asymmetric. */
  pl_massesymerr: number | null;
  /** Limit flag for pl_masse: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  pl_masselim: LimitFlag | null;
  /**
   * pl_masse formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  pl_massestr: string | null;
  /** Display format for pl_masse (internal archive use; almost always `null`). */
  pl_masseformat: string | null;
  /** ID of the solution (row in the `ps` table) that pl_masse was taken from. `null` if it is a calculated value. */
  pl_masse_solnid: string | null;
  /**
   * Bibliographic reference for pl_masse as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  pl_masse_reflink: string | null;
  /** Planet mass (directly measured) [Jupiter masses]. */
  pl_massj: number | null;
  /** Upper (+) uncertainty of: planet mass (directly measured) [Jupiter masses]. */
  pl_massjerr1: number | null;
  /** Lower (−) uncertainty of: planet mass (directly measured) [Jupiter masses]. Expressed as a negative value. */
  pl_massjerr2: number | null;
  /** Whether the uncertainty of pl_massj is symmetric: 1 = symmetric, 0 = asymmetric. */
  pl_massjsymerr: number | null;
  /** Limit flag for pl_massj: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  pl_massjlim: LimitFlag | null;
  /**
   * pl_massj formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  pl_massjstr: string | null;
  /** Display format for pl_massj (internal archive use; almost always `null`). */
  pl_massjformat: string | null;
  /** ID of the solution (row in the `ps` table) that pl_massj was taken from. `null` if it is a calculated value. */
  pl_massj_solnid: string | null;
  /**
   * Bibliographic reference for pl_massj as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  pl_massj_reflink: string | null;
  /** Minimum mass M·sin(i), typical of radial velocity when the inclination is unknown [Earth masses]. */
  pl_msinie: number | null;
  /** Upper (+) uncertainty of: minimum mass M·sin(i), typical of radial velocity when the inclination is unknown [Earth masses]. */
  pl_msinieerr1: number | null;
  /** Lower (−) uncertainty of: minimum mass M·sin(i), typical of radial velocity when the inclination is unknown [Earth masses]. Expressed as a negative value. */
  pl_msinieerr2: number | null;
  /** Whether the uncertainty of pl_msinie is symmetric: 1 = symmetric, 0 = asymmetric. */
  pl_msiniesymerr: number | null;
  /** Limit flag for pl_msinie: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  pl_msinielim: LimitFlag | null;
  /**
   * pl_msinie formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  pl_msiniestr: string | null;
  /** Display format for pl_msinie (internal archive use; almost always `null`). */
  pl_msinieformat: string | null;
  /** ID of the solution (row in the `ps` table) that pl_msinie was taken from. `null` if it is a calculated value. */
  pl_msinie_solnid: string | null;
  /**
   * Bibliographic reference for pl_msinie as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  pl_msinie_reflink: string | null;
  /** Minimum mass M·sin(i), typical of radial velocity when the inclination is unknown [Jupiter masses]. */
  pl_msinij: number | null;
  /** Upper (+) uncertainty of: minimum mass M·sin(i), typical of radial velocity when the inclination is unknown [Jupiter masses]. */
  pl_msinijerr1: number | null;
  /** Lower (−) uncertainty of: minimum mass M·sin(i), typical of radial velocity when the inclination is unknown [Jupiter masses]. Expressed as a negative value. */
  pl_msinijerr2: number | null;
  /** Whether the uncertainty of pl_msinij is symmetric: 1 = symmetric, 0 = asymmetric. */
  pl_msinijsymerr: number | null;
  /** Limit flag for pl_msinij: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  pl_msinijlim: LimitFlag | null;
  /**
   * pl_msinij formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  pl_msinijstr: string | null;
  /** Display format for pl_msinij (internal archive use; almost always `null`). */
  pl_msinijformat: string | null;
  /** ID of the solution (row in the `ps` table) that pl_msinij was taken from. `null` if it is a calculated value. */
  pl_msinij_solnid: string | null;
  /**
   * Bibliographic reference for pl_msinij as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  pl_msinij_reflink: string | null;
  /** Mass obtained by dividing M·sin(i) by sin(i) using a known inclination [Earth masses]. */
  pl_cmasse: number | null;
  /** Upper (+) uncertainty of: mass obtained by dividing M·sin(i) by sin(i) using a known inclination [Earth masses]. */
  pl_cmasseerr1: number | null;
  /** Lower (−) uncertainty of: mass obtained by dividing M·sin(i) by sin(i) using a known inclination [Earth masses]. Expressed as a negative value. */
  pl_cmasseerr2: number | null;
  /** Whether the uncertainty of pl_cmasse is symmetric: 1 = symmetric, 0 = asymmetric. */
  pl_cmassesymerr: number | null;
  /** Limit flag for pl_cmasse: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  pl_cmasselim: LimitFlag | null;
  /**
   * pl_cmasse formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  pl_cmassestr: string | null;
  /** Display format for pl_cmasse (internal archive use; almost always `null`). */
  pl_cmasseformat: string | null;
  /** ID of the solution (row in the `ps` table) that pl_cmasse was taken from. `null` if it is a calculated value. */
  pl_cmasse_solnid: string | null;
  /**
   * Bibliographic reference for pl_cmasse as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  pl_cmasse_reflink: string | null;
  /** Mass obtained by dividing M·sin(i) by sin(i) using a known inclination [Jupiter masses]. */
  pl_cmassj: number | null;
  /** Upper (+) uncertainty of: mass obtained by dividing M·sin(i) by sin(i) using a known inclination [Jupiter masses]. */
  pl_cmassjerr1: number | null;
  /** Lower (−) uncertainty of: mass obtained by dividing M·sin(i) by sin(i) using a known inclination [Jupiter masses]. Expressed as a negative value. */
  pl_cmassjerr2: number | null;
  /** Whether the uncertainty of pl_cmassj is symmetric: 1 = symmetric, 0 = asymmetric. */
  pl_cmassjsymerr: number | null;
  /** Limit flag for pl_cmassj: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  pl_cmassjlim: LimitFlag | null;
  /**
   * pl_cmassj formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  pl_cmassjstr: string | null;
  /** Display format for pl_cmassj (internal archive use; almost always `null`). */
  pl_cmassjformat: string | null;
  /** ID of the solution (row in the `ps` table) that pl_cmassj was taken from. `null` if it is a calculated value. */
  pl_cmassj_solnid: string | null;
  /**
   * Bibliographic reference for pl_cmassj as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  pl_cmassj_reflink: string | null;
  /**
   * Best available mass estimate (may be true mass or M·sin(i); see `pl_bmassprov`) [Earth masses].
   * This is the most complete mass field: use it if you want a value for as many planets as possible.
   */
  pl_bmasse: number | null;
  /** Upper (+) uncertainty of: best available mass estimate (may be true mass or M·sin(i); see `pl_bmassprov`) [Earth masses]. */
  pl_bmasseerr1: number | null;
  /** Lower (−) uncertainty of: best available mass estimate (may be true mass or M·sin(i); see `pl_bmassprov`) [Earth masses]. Expressed as a negative value. */
  pl_bmasseerr2: number | null;
  /** Whether the uncertainty of pl_bmasse is symmetric: 1 = symmetric, 0 = asymmetric. */
  pl_bmassesymerr: number | null;
  /** Limit flag for pl_bmasse: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  pl_bmasselim: LimitFlag | null;
  /**
   * pl_bmasse formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  pl_bmassestr: string | null;
  /** Display format for pl_bmasse (internal archive use; almost always `null`). */
  pl_bmasseformat: string | null;
  /** ID of the solution (row in the `ps` table) that pl_bmasse was taken from. `null` if it is a calculated value. */
  pl_bmasse_solnid: string | null;
  /**
   * Bibliographic reference for pl_bmasse as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  pl_bmasse_reflink: string | null;
  /** Best available mass estimate (see `pl_bmassprov`) [Jupiter masses]. */
  pl_bmassj: number | null;
  /** Upper (+) uncertainty of: best available mass estimate (see `pl_bmassprov`) [Jupiter masses]. */
  pl_bmassjerr1: number | null;
  /** Lower (−) uncertainty of: best available mass estimate (see `pl_bmassprov`) [Jupiter masses]. Expressed as a negative value. */
  pl_bmassjerr2: number | null;
  /** Whether the uncertainty of pl_bmassj is symmetric: 1 = symmetric, 0 = asymmetric. */
  pl_bmassjsymerr: number | null;
  /** Limit flag for pl_bmassj: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  pl_bmassjlim: LimitFlag | null;
  /**
   * pl_bmassj formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  pl_bmassjstr: string | null;
  /** Display format for pl_bmassj (internal archive use; almost always `null`). */
  pl_bmassjformat: string | null;
  /** ID of the solution (row in the `ps` table) that pl_bmassj was taken from. `null` if it is a calculated value. */
  pl_bmassj_solnid: string | null;
  /**
   * Bibliographic reference for pl_bmassj as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  pl_bmassj_reflink: string | null;
  /** Where the "best mass" comes from: true mass ("Mass"), minimum mass ("Msini") or corrected ("Msin(i)/sin(i)"). */
  pl_bmassprov: BestMassProvenance | null;
  /** Planet density [g/cm³]. */
  pl_dens: number | null;
  /** Upper (+) uncertainty of: planet density [g/cm³]. */
  pl_denserr1: number | null;
  /** Lower (−) uncertainty of: planet density [g/cm³]. Expressed as a negative value. */
  pl_denserr2: number | null;
  /** Whether the uncertainty of pl_dens is symmetric: 1 = symmetric, 0 = asymmetric. */
  pl_denssymerr: number | null;
  /** Limit flag for pl_dens: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  pl_denslim: LimitFlag | null;
  /**
   * pl_dens formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  pl_densstr: string | null;
  /** Display format for pl_dens (internal archive use; almost always `null`). */
  pl_densformat: string | null;
  /** ID of the solution (row in the `ps` table) that pl_dens was taken from. `null` if it is a calculated value. */
  pl_dens_solnid: string | null;
  /**
   * Bibliographic reference for pl_dens as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  pl_dens_reflink: string | null;
  /** Equilibrium temperature (estimated temperature assuming a blackbody heated by its star) [K]. */
  pl_eqt: number | null;
  /** Upper (+) uncertainty of: equilibrium temperature (estimated temperature assuming a blackbody heated by its star) [K]. */
  pl_eqterr1: number | null;
  /** Lower (−) uncertainty of: equilibrium temperature (estimated temperature assuming a blackbody heated by its star) [K]. Expressed as a negative value. */
  pl_eqterr2: number | null;
  /** Whether the uncertainty of pl_eqt is symmetric: 1 = symmetric, 0 = asymmetric. */
  pl_eqtsymerr: number | null;
  /** Limit flag for pl_eqt: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  pl_eqtlim: LimitFlag | null;
  /**
   * pl_eqt formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  pl_eqtstr: string | null;
  /** Display format for pl_eqt (internal archive use; almost always `null`). */
  pl_eqtformat: string | null;
  /** ID of the solution (row in the `ps` table) that pl_eqt was taken from. `null` if it is a calculated value. */
  pl_eqt_solnid: string | null;
  /**
   * Bibliographic reference for pl_eqt as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  pl_eqt_reflink: string | null;
  /** Insolation flux: energy received from its star [times the flux received by Earth]. */
  pl_insol: number | null;
  /** Upper (+) uncertainty of: insolation flux: energy received from its star [times the flux received by Earth]. */
  pl_insolerr1: number | null;
  /** Lower (−) uncertainty of: insolation flux: energy received from its star [times the flux received by Earth]. Expressed as a negative value. */
  pl_insolerr2: number | null;
  /** Whether the uncertainty of pl_insol is symmetric: 1 = symmetric, 0 = asymmetric. */
  pl_insolsymerr: number | null;
  /** Limit flag for pl_insol: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  pl_insollim: LimitFlag | null;
  /**
   * pl_insol formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  pl_insolstr: string | null;
  /** Display format for pl_insol (internal archive use; almost always `null`). */
  pl_insolformat: string | null;
  /** ID of the solution (row in the `ps` table) that pl_insol was taken from. `null` if it is a calculated value. */
  pl_insol_solnid: string | null;
  /**
   * Bibliographic reference for pl_insol as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  pl_insol_reflink: string | null;
  /** Radial velocity semi-amplitude: how much the star "wobbles" due to the planet's pull [m/s]. */
  pl_rvamp: number | null;
  /** Upper (+) uncertainty of: radial velocity semi-amplitude: how much the star "wobbles" due to the planet's pull [m/s]. */
  pl_rvamperr1: number | null;
  /** Lower (−) uncertainty of: radial velocity semi-amplitude: how much the star "wobbles" due to the planet's pull [m/s]. Expressed as a negative value. */
  pl_rvamperr2: number | null;
  /** Whether the uncertainty of pl_rvamp is symmetric: 1 = symmetric, 0 = asymmetric. */
  pl_rvampsymerr: number | null;
  /** Limit flag for pl_rvamp: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  pl_rvamplim: LimitFlag | null;
  /**
   * pl_rvamp formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  pl_rvampstr: string | null;
  /** Display format for pl_rvamp (internal archive use; almost always `null`). */
  pl_rvampformat: string | null;
  /** ID of the solution (row in the `ps` table) that pl_rvamp was taken from. `null` if it is a calculated value. */
  pl_rvamp_solnid: string | null;
  /**
   * Bibliographic reference for pl_rvamp as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  pl_rvamp_reflink: string | null;

  // ──────────────────────────────────────────────────────────────────────
  // Spectroscopy metrics (useful for selecting JWST targets)
  // ──────────────────────────────────────────────────────────────────────

  /** TSM (Transmission Spectroscopy Metric): how good a target it is for transmission spectroscopy. */
  pl_tsm: number | null;
  /** Upper (+) uncertainty of: tSM (Transmission Spectroscopy Metric): how good a target it is for transmission spectroscopy. */
  pl_tsmerr1: number | null;
  /** Lower (−) uncertainty of: tSM (Transmission Spectroscopy Metric): how good a target it is for transmission spectroscopy. Expressed as a negative value. */
  pl_tsmerr2: number | null;
  /** Limit flag for pl_tsm: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  pl_tsmlim: LimitFlag | null;
  /**
   * pl_tsm formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   * Note: like `pl_esmstr`, the API may return this one as a number.
   */
  pl_tsmstr: number | string | null;
  /** ID of the solution (row in the `ps` table) that pl_tsm was taken from. `null` if it is a calculated value. */
  pl_tsm_solnid: string | null;
  /**
   * Bibliographic reference for pl_tsm as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  pl_tsm_reflink: string | null;
  /** ESM (Emission Spectroscopy Metric): how good a target it is for emission spectroscopy. */
  pl_esm: number | null;
  /** Upper (+) uncertainty of: eSM (Emission Spectroscopy Metric): how good a target it is for emission spectroscopy. */
  pl_esmerr1: number | null;
  /** Lower (−) uncertainty of: eSM (Emission Spectroscopy Metric): how good a target it is for emission spectroscopy. Expressed as a negative value. */
  pl_esmerr2: number | null;
  /** Limit flag for pl_esm: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  pl_esmlim: LimitFlag | null;
  /**
   * pl_esm formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   * Note: unlike most `*str` fields (but like `pl_tsmstr`), the API may return this one as a number.
   */
  pl_esmstr: number | string | null;
  /** ID of the solution (row in the `ps` table) that pl_esm was taken from. `null` if it is a calculated value. */
  pl_esm_solnid: string | null;
  /**
   * Bibliographic reference for pl_esm as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  pl_esm_reflink: string | null;

  // ──────────────────────────────────────────────────────────────────────
  // Host star
  // ──────────────────────────────────────────────────────────────────────

  /** Spectral type of the star (e.g. "G8 V"). */
  st_spectype: string | null;
  /** ID of the solution (row in the `ps` table) that st_spectype was taken from. `null` if it is a calculated value. */
  st_spectype_solnid: string | null;
  /**
   * Bibliographic reference for st_spectype as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  st_spectype_reflink: string | null;
  /** Effective temperature of the stellar surface [K]. */
  st_teff: number | null;
  /** Upper (+) uncertainty of: effective temperature of the stellar surface [K]. */
  st_tefferr1: number | null;
  /** Lower (−) uncertainty of: effective temperature of the stellar surface [K]. Expressed as a negative value. */
  st_tefferr2: number | null;
  /** Whether the uncertainty of st_teff is symmetric: 1 = symmetric, 0 = asymmetric. */
  st_teffsymerr: number | null;
  /** Limit flag for st_teff: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  st_tefflim: LimitFlag | null;
  /**
   * st_teff formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  st_teffstr: string | null;
  /** Display format for st_teff (internal archive use; almost always `null`). */
  st_teffformat: string | null;
  /** ID of the solution (row in the `ps` table) that st_teff was taken from. `null` if it is a calculated value. */
  st_teff_solnid: string | null;
  /**
   * Bibliographic reference for st_teff as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  st_teff_reflink: string | null;
  /** Stellar radius [solar radii]. */
  st_rad: number | null;
  /** Upper (+) uncertainty of: stellar radius [solar radii]. */
  st_raderr1: number | null;
  /** Lower (−) uncertainty of: stellar radius [solar radii]. Expressed as a negative value. */
  st_raderr2: number | null;
  /** Whether the uncertainty of st_rad is symmetric: 1 = symmetric, 0 = asymmetric. */
  st_radsymerr: number | null;
  /** Limit flag for st_rad: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  st_radlim: LimitFlag | null;
  /**
   * st_rad formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  st_radstr: string | null;
  /** Display format for st_rad (internal archive use; almost always `null`). */
  st_radformat: string | null;
  /** ID of the solution (row in the `ps` table) that st_rad was taken from. `null` if it is a calculated value. */
  st_rad_solnid: string | null;
  /**
   * Bibliographic reference for st_rad as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  st_rad_reflink: string | null;
  /** Stellar mass [solar masses]. */
  st_mass: number | null;
  /** Upper (+) uncertainty of: stellar mass [solar masses]. */
  st_masserr1: number | null;
  /** Lower (−) uncertainty of: stellar mass [solar masses]. Expressed as a negative value. */
  st_masserr2: number | null;
  /** Whether the uncertainty of st_mass is symmetric: 1 = symmetric, 0 = asymmetric. */
  st_masssymerr: number | null;
  /** Limit flag for st_mass: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  st_masslim: LimitFlag | null;
  /**
   * st_mass formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  st_massstr: string | null;
  /** Display format for st_mass (internal archive use; almost always `null`). */
  st_massformat: string | null;
  /** ID of the solution (row in the `ps` table) that st_mass was taken from. `null` if it is a calculated value. */
  st_mass_solnid: string | null;
  /**
   * Bibliographic reference for st_mass as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  st_mass_reflink: string | null;
  /** Stellar density [g/cm³]. */
  st_dens: number | null;
  /** Upper (+) uncertainty of: stellar density [g/cm³]. */
  st_denserr1: number | null;
  /** Lower (−) uncertainty of: stellar density [g/cm³]. Expressed as a negative value. */
  st_denserr2: number | null;
  /** Whether the uncertainty of st_dens is symmetric: 1 = symmetric, 0 = asymmetric. */
  st_denssymerr: number | null;
  /** Limit flag for st_dens: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  st_denslim: LimitFlag | null;
  /**
   * st_dens formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  st_densstr: string | null;
  /** Display format for st_dens (internal archive use; almost always `null`). */
  st_densformat: string | null;
  /** ID of the solution (row in the `ps` table) that st_dens was taken from. `null` if it is a calculated value. */
  st_dens_solnid: string | null;
  /**
   * Bibliographic reference for st_dens as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  st_dens_reflink: string | null;
  /** Stellar luminosity on a logarithmic scale [log10(L☉)]. */
  st_lum: number | null;
  /** Upper (+) uncertainty of: stellar luminosity on a logarithmic scale [log10(L☉)]. */
  st_lumerr1: number | null;
  /** Lower (−) uncertainty of: stellar luminosity on a logarithmic scale [log10(L☉)]. Expressed as a negative value. */
  st_lumerr2: number | null;
  /** Whether the uncertainty of st_lum is symmetric: 1 = symmetric, 0 = asymmetric. */
  st_lumsymerr: number | null;
  /** Limit flag for st_lum: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  st_lumlim: LimitFlag | null;
  /**
   * st_lum formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  st_lumstr: string | null;
  /** Display format for st_lum (internal archive use; almost always `null`). */
  st_lumformat: string | null;
  /** ID of the solution (row in the `ps` table) that st_lum was taken from. `null` if it is a calculated value. */
  st_lum_solnid: string | null;
  /**
   * Bibliographic reference for st_lum as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  st_lum_reflink: string | null;
  /** Stellar surface gravity [log10(cm/s²)]. */
  st_logg: number | null;
  /** Upper (+) uncertainty of: stellar surface gravity [log10(cm/s²)]. */
  st_loggerr1: number | null;
  /** Lower (−) uncertainty of: stellar surface gravity [log10(cm/s²)]. Expressed as a negative value. */
  st_loggerr2: number | null;
  /** Whether the uncertainty of st_logg is symmetric: 1 = symmetric, 0 = asymmetric. */
  st_loggsymerr: number | null;
  /** Limit flag for st_logg: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  st_logglim: LimitFlag | null;
  /**
   * st_logg formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  st_loggstr: string | null;
  /** Display format for st_logg (internal archive use; almost always `null`). */
  st_loggformat: string | null;
  /** ID of the solution (row in the `ps` table) that st_logg was taken from. `null` if it is a calculated value. */
  st_logg_solnid: string | null;
  /**
   * Bibliographic reference for st_logg as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  st_logg_reflink: string | null;
  /** Stellar age [Gyr, billions of years]. */
  st_age: number | null;
  /** Upper (+) uncertainty of: stellar age [Gyr, billions of years]. */
  st_ageerr1: number | null;
  /** Lower (−) uncertainty of: stellar age [Gyr, billions of years]. Expressed as a negative value. */
  st_ageerr2: number | null;
  /** Whether the uncertainty of st_age is symmetric: 1 = symmetric, 0 = asymmetric. */
  st_agesymerr: number | null;
  /** Limit flag for st_age: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  st_agelim: LimitFlag | null;
  /**
   * st_age formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  st_agestr: string | null;
  /** Display format for st_age (internal archive use; almost always `null`). */
  st_ageformat: string | null;
  /** ID of the solution (row in the `ps` table) that st_age was taken from. `null` if it is a calculated value. */
  st_age_solnid: string | null;
  /**
   * Bibliographic reference for st_age as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  st_age_reflink: string | null;
  /** Metallicity: abundance of elements heavier than helium relative to the Sun [dex]. */
  st_met: number | null;
  /** Upper (+) uncertainty of: metallicity: abundance of elements heavier than helium relative to the Sun [dex]. */
  st_meterr1: number | null;
  /** Lower (−) uncertainty of: metallicity: abundance of elements heavier than helium relative to the Sun [dex]. Expressed as a negative value. */
  st_meterr2: number | null;
  /** Whether the uncertainty of st_met is symmetric: 1 = symmetric, 0 = asymmetric. */
  st_metsymerr: number | null;
  /** Limit flag for st_met: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  st_metlim: LimitFlag | null;
  /**
   * st_met formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  st_metstr: string | null;
  /** Display format for st_met (internal archive use; almost always `null`). */
  st_metformat: string | null;
  /** ID of the solution (row in the `ps` table) that st_met was taken from. `null` if it is a calculated value. */
  st_met_solnid: string | null;
  /**
   * Bibliographic reference for st_met as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  st_met_reflink: string | null;
  /** Ratio used to express the metallicity (e.g. "[Fe/H]" or "[M/H]"). */
  st_metratio: MetallicityRatio | null;
  /** Metallicity expressed as an alternative value (almost always `null` in practice). */
  st_metn: number | null;
  /** Chromospheric activity index log R'HK (more negative = less active star). */
  st_log_rhk: number | null;
  /** Upper (+) uncertainty of: chromospheric activity index log R'HK (more negative = less active star). */
  st_log_rhkerr1: number | null;
  /** Lower (−) uncertainty of: chromospheric activity index log R'HK (more negative = less active star). Expressed as a negative value. */
  st_log_rhkerr2: number | null;
  /** Whether the uncertainty of st_log_rhk is symmetric: 1 = symmetric, 0 = asymmetric. */
  st_log_rhksymerr: number | null;
  /** Limit flag for st_log_rhk: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  st_log_rhklim: LimitFlag | null;
  /**
   * st_log_rhk formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  st_log_rhkstr: string | null;
  /** Display format for st_log_rhk (internal archive use; almost always `null`). */
  st_log_rhkformat: string | null;
  /** ID of the solution (row in the `ps` table) that st_log_rhk was taken from. `null` if it is a calculated value. */
  st_log_rhk_solnid: string | null;
  /**
   * Bibliographic reference for st_log_rhk as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  st_log_rhk_reflink: string | null;
  /** Projected rotational velocity v·sin(i) [km/s]. */
  st_vsin: number | null;
  /** Upper (+) uncertainty of: projected rotational velocity v·sin(i) [km/s]. */
  st_vsinerr1: number | null;
  /** Lower (−) uncertainty of: projected rotational velocity v·sin(i) [km/s]. Expressed as a negative value. */
  st_vsinerr2: number | null;
  /** Whether the uncertainty of st_vsin is symmetric: 1 = symmetric, 0 = asymmetric. */
  st_vsinsymerr: number | null;
  /** Limit flag for st_vsin: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  st_vsinlim: LimitFlag | null;
  /**
   * st_vsin formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  st_vsinstr: string | null;
  /** Display format for st_vsin (internal archive use; almost always `null`). */
  st_vsinformat: string | null;
  /** ID of the solution (row in the `ps` table) that st_vsin was taken from. `null` if it is a calculated value. */
  st_vsin_solnid: string | null;
  /**
   * Bibliographic reference for st_vsin as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  st_vsin_reflink: string | null;
  /** Stellar rotation period [days]. */
  st_rotp: number | null;
  /** Upper (+) uncertainty of: stellar rotation period [days]. */
  st_rotperr1: number | null;
  /** Lower (−) uncertainty of: stellar rotation period [days]. Expressed as a negative value. */
  st_rotperr2: number | null;
  /** Whether the uncertainty of st_rotp is symmetric: 1 = symmetric, 0 = asymmetric. */
  st_rotpsymerr: number | null;
  /** Limit flag for st_rotp: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  st_rotplim: LimitFlag | null;
  /**
   * st_rotp formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  st_rotpstr: string | null;
  /** Display format for st_rotp (internal archive use; almost always `null`). */
  st_rotpformat: string | null;
  /** ID of the solution (row in the `ps` table) that st_rotp was taken from. `null` if it is a calculated value. */
  st_rotp_solnid: string | null;
  /**
   * Bibliographic reference for st_rotp as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  st_rotp_reflink: string | null;
  /** Systemic radial velocity: speed at which the system approaches (−) or recedes (+) from us [km/s]. */
  st_radv: number | null;
  /** Upper (+) uncertainty of: systemic radial velocity: speed at which the system approaches (−) or recedes (+) from us [km/s]. */
  st_radverr1: number | null;
  /** Lower (−) uncertainty of: systemic radial velocity: speed at which the system approaches (−) or recedes (+) from us [km/s]. Expressed as a negative value. */
  st_radverr2: number | null;
  /** Whether the uncertainty of st_radv is symmetric: 1 = symmetric, 0 = asymmetric. */
  st_radvsymerr: number | null;
  /** Limit flag for st_radv: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  st_radvlim: LimitFlag | null;
  /**
   * st_radv formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  st_radvstr: string | null;
  /** Display format for st_radv (internal archive use; almost always `null`). */
  st_radvformat: string | null;
  /** ID of the solution (row in the `ps` table) that st_radv was taken from. `null` if it is a calculated value. */
  st_radv_solnid: string | null;
  /**
   * Bibliographic reference for st_radv as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  st_radv_reflink: string | null;

  // ──────────────────────────────────────────────────────────────────────
  // System: distance and motion
  // ──────────────────────────────────────────────────────────────────────

  /** Distance to the system [pc, parsecs (1 pc ≈ 3.26 light-years)]. */
  sy_dist: number | null;
  /** Upper (+) uncertainty of: distance to the system [pc, parsecs (1 pc ≈ 3.26 light-years)]. */
  sy_disterr1: number | null;
  /** Lower (−) uncertainty of: distance to the system [pc, parsecs (1 pc ≈ 3.26 light-years)]. Expressed as a negative value. */
  sy_disterr2: number | null;
  /** Whether the uncertainty of sy_dist is symmetric: 1 = symmetric, 0 = asymmetric. */
  sy_distsymerr: number | null;
  /** Limit flag for sy_dist: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  sy_distlim: LimitFlag | null;
  /**
   * sy_dist formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  sy_diststr: string | null;
  /** Display format for sy_dist (internal archive use; almost always `null`). */
  sy_distformat: string | null;
  /** ID of the solution (row in the `ps` table) that sy_dist was taken from. `null` if it is a calculated value. */
  sy_dist_solnid: string | null;
  /**
   * Bibliographic reference for sy_dist as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  sy_dist_reflink: string | null;
  /** Parallax [mas, milliarcseconds]. */
  sy_plx: number | null;
  /** Upper (+) uncertainty of: parallax [mas, milliarcseconds]. */
  sy_plxerr1: number | null;
  /** Lower (−) uncertainty of: parallax [mas, milliarcseconds]. Expressed as a negative value. */
  sy_plxerr2: number | null;
  /** Whether the uncertainty of sy_plx is symmetric: 1 = symmetric, 0 = asymmetric. */
  sy_plxsymerr: number | null;
  /** Limit flag for sy_plx: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  sy_plxlim: LimitFlag | null;
  /**
   * sy_plx formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  sy_plxstr: string | null;
  /** Display format for sy_plx (internal archive use; almost always `null`). */
  sy_plxformat: string | null;
  /** ID of the solution (row in the `ps` table) that sy_plx was taken from. `null` if it is a calculated value. */
  sy_plx_solnid: string | null;
  /**
   * Bibliographic reference for sy_plx as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  sy_plx_reflink: string | null;
  /** Total proper motion on the sky [mas/yr]. */
  sy_pm: number | null;
  /** Upper (+) uncertainty of: total proper motion on the sky [mas/yr]. */
  sy_pmerr1: number | null;
  /** Lower (−) uncertainty of: total proper motion on the sky [mas/yr]. Expressed as a negative value. */
  sy_pmerr2: number | null;
  /** Whether the uncertainty of sy_pm is symmetric: 1 = symmetric, 0 = asymmetric. */
  sy_pmsymerr: number | null;
  /** Limit flag for sy_pm: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  sy_pmlim: LimitFlag | null;
  /**
   * sy_pm formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  sy_pmstr: string | null;
  /** Display format for sy_pm (internal archive use; almost always `null`). */
  sy_pmformat: string | null;
  /** ID of the solution (row in the `ps` table) that sy_pm was taken from. `null` if it is a calculated value. */
  sy_pm_solnid: string | null;
  /**
   * Bibliographic reference for sy_pm as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  sy_pm_reflink: string | null;
  /** Proper motion in right ascension [mas/yr]. */
  sy_pmra: number | null;
  /** Upper (+) uncertainty of: proper motion in right ascension [mas/yr]. */
  sy_pmraerr1: number | null;
  /** Lower (−) uncertainty of: proper motion in right ascension [mas/yr]. Expressed as a negative value. */
  sy_pmraerr2: number | null;
  /** Whether the uncertainty of sy_pmra is symmetric: 1 = symmetric, 0 = asymmetric. */
  sy_pmrasymerr: number | null;
  /** Limit flag for sy_pmra: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  sy_pmralim: LimitFlag | null;
  /**
   * sy_pmra formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  sy_pmrastr: string | null;
  /** Display format for sy_pmra (internal archive use; almost always `null`). */
  sy_pmraformat: string | null;
  /** ID of the solution (row in the `ps` table) that sy_pmra was taken from. `null` if it is a calculated value. */
  sy_pmra_solnid: string | null;
  /**
   * Bibliographic reference for sy_pmra as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  sy_pmra_reflink: string | null;
  /** Proper motion in declination [mas/yr]. */
  sy_pmdec: number | null;
  /** Upper (+) uncertainty of: proper motion in declination [mas/yr]. */
  sy_pmdecerr1: number | null;
  /** Lower (−) uncertainty of: proper motion in declination [mas/yr]. Expressed as a negative value. */
  sy_pmdecerr2: number | null;
  /** Whether the uncertainty of sy_pmdec is symmetric: 1 = symmetric, 0 = asymmetric. */
  sy_pmdecsymerr: number | null;
  /** Limit flag for sy_pmdec: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  sy_pmdeclim: LimitFlag | null;
  /**
   * sy_pmdec formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  sy_pmdecstr: string | null;
  /** Display format for sy_pmdec (internal archive use; almost always `null`). */
  sy_pmdecformat: string | null;
  /** ID of the solution (row in the `ps` table) that sy_pmdec was taken from. `null` if it is a calculated value. */
  sy_pmdec_solnid: string | null;
  /**
   * Bibliographic reference for sy_pmdec as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  sy_pmdec_reflink: string | null;

  // ──────────────────────────────────────────────────────────────────────
  // System: apparent magnitudes (brightness; lower number = brighter)
  // ──────────────────────────────────────────────────────────────────────

  /** B magnitude (Johnson). */
  sy_bmag: number | null;
  /** Upper (+) uncertainty of: b magnitude (Johnson). */
  sy_bmagerr1: number | null;
  /** Lower (−) uncertainty of: b magnitude (Johnson). Expressed as a negative value. */
  sy_bmagerr2: number | null;
  /** Whether the uncertainty of sy_bmag is symmetric: 1 = symmetric, 0 = asymmetric. */
  sy_bmagsymerr: number | null;
  /** Limit flag for sy_bmag: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  sy_bmaglim: LimitFlag | null;
  /**
   * sy_bmag formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  sy_bmagstr: string | null;
  /** Display format for sy_bmag (internal archive use; almost always `null`). */
  sy_bmagformat: string | null;
  /** ID of the solution (row in the `ps` table) that sy_bmag was taken from. `null` if it is a calculated value. */
  sy_bmag_solnid: string | null;
  /**
   * Bibliographic reference for sy_bmag as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  sy_bmag_reflink: string | null;
  /** V magnitude (Johnson, visible). */
  sy_vmag: number | null;
  /** Upper (+) uncertainty of: v magnitude (Johnson, visible). */
  sy_vmagerr1: number | null;
  /** Lower (−) uncertainty of: v magnitude (Johnson, visible). Expressed as a negative value. */
  sy_vmagerr2: number | null;
  /** Whether the uncertainty of sy_vmag is symmetric: 1 = symmetric, 0 = asymmetric. */
  sy_vmagsymerr: number | null;
  /** Limit flag for sy_vmag: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  sy_vmaglim: LimitFlag | null;
  /**
   * sy_vmag formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  sy_vmagstr: string | null;
  /** Display format for sy_vmag (internal archive use; almost always `null`). */
  sy_vmagformat: string | null;
  /** ID of the solution (row in the `ps` table) that sy_vmag was taken from. `null` if it is a calculated value. */
  sy_vmag_solnid: string | null;
  /**
   * Bibliographic reference for sy_vmag as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  sy_vmag_reflink: string | null;
  /** u magnitude (Sloan). */
  sy_umag: number | null;
  /** Upper (+) uncertainty of: u magnitude (Sloan). */
  sy_umagerr1: number | null;
  /** Lower (−) uncertainty of: u magnitude (Sloan). Expressed as a negative value. */
  sy_umagerr2: number | null;
  /** Whether the uncertainty of sy_umag is symmetric: 1 = symmetric, 0 = asymmetric. */
  sy_umagsymerr: number | null;
  /** Limit flag for sy_umag: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  sy_umaglim: LimitFlag | null;
  /**
   * sy_umag formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  sy_umagstr: string | null;
  /** Display format for sy_umag (internal archive use; almost always `null`). */
  sy_umagformat: string | null;
  /** ID of the solution (row in the `ps` table) that sy_umag was taken from. `null` if it is a calculated value. */
  sy_umag_solnid: string | null;
  /**
   * Bibliographic reference for sy_umag as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  sy_umag_reflink: string | null;
  /** g magnitude (Sloan). */
  sy_gmag: number | null;
  /** Upper (+) uncertainty of: g magnitude (Sloan). */
  sy_gmagerr1: number | null;
  /** Lower (−) uncertainty of: g magnitude (Sloan). Expressed as a negative value. */
  sy_gmagerr2: number | null;
  /** Whether the uncertainty of sy_gmag is symmetric: 1 = symmetric, 0 = asymmetric. */
  sy_gmagsymerr: number | null;
  /** Limit flag for sy_gmag: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  sy_gmaglim: LimitFlag | null;
  /**
   * sy_gmag formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  sy_gmagstr: string | null;
  /** Display format for sy_gmag (internal archive use; almost always `null`). */
  sy_gmagformat: string | null;
  /** ID of the solution (row in the `ps` table) that sy_gmag was taken from. `null` if it is a calculated value. */
  sy_gmag_solnid: string | null;
  /**
   * Bibliographic reference for sy_gmag as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  sy_gmag_reflink: string | null;
  /** r magnitude (Sloan). */
  sy_rmag: number | null;
  /** Upper (+) uncertainty of: r magnitude (Sloan). */
  sy_rmagerr1: number | null;
  /** Lower (−) uncertainty of: r magnitude (Sloan). Expressed as a negative value. */
  sy_rmagerr2: number | null;
  /** Whether the uncertainty of sy_rmag is symmetric: 1 = symmetric, 0 = asymmetric. */
  sy_rmagsymerr: number | null;
  /** Limit flag for sy_rmag: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  sy_rmaglim: LimitFlag | null;
  /**
   * sy_rmag formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  sy_rmagstr: string | null;
  /** Display format for sy_rmag (internal archive use; almost always `null`). */
  sy_rmagformat: string | null;
  /** ID of the solution (row in the `ps` table) that sy_rmag was taken from. `null` if it is a calculated value. */
  sy_rmag_solnid: string | null;
  /**
   * Bibliographic reference for sy_rmag as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  sy_rmag_reflink: string | null;
  /** i magnitude (Sloan). */
  sy_imag: number | null;
  /** Upper (+) uncertainty of: i magnitude (Sloan). */
  sy_imagerr1: number | null;
  /** Lower (−) uncertainty of: i magnitude (Sloan). Expressed as a negative value. */
  sy_imagerr2: number | null;
  /** Whether the uncertainty of sy_imag is symmetric: 1 = symmetric, 0 = asymmetric. */
  sy_imagsymerr: number | null;
  /** Limit flag for sy_imag: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  sy_imaglim: LimitFlag | null;
  /**
   * sy_imag formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  sy_imagstr: string | null;
  /** Display format for sy_imag (internal archive use; almost always `null`). */
  sy_imagformat: string | null;
  /** ID of the solution (row in the `ps` table) that sy_imag was taken from. `null` if it is a calculated value. */
  sy_imag_solnid: string | null;
  /**
   * Bibliographic reference for sy_imag as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  sy_imag_reflink: string | null;
  /** z magnitude (Sloan). */
  sy_zmag: number | null;
  /** Upper (+) uncertainty of: z magnitude (Sloan). */
  sy_zmagerr1: number | null;
  /** Lower (−) uncertainty of: z magnitude (Sloan). Expressed as a negative value. */
  sy_zmagerr2: number | null;
  /** Whether the uncertainty of sy_zmag is symmetric: 1 = symmetric, 0 = asymmetric. */
  sy_zmagsymerr: number | null;
  /** Limit flag for sy_zmag: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  sy_zmaglim: LimitFlag | null;
  /**
   * sy_zmag formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  sy_zmagstr: string | null;
  /** Display format for sy_zmag (internal archive use; almost always `null`). */
  sy_zmagformat: string | null;
  /** ID of the solution (row in the `ps` table) that sy_zmag was taken from. `null` if it is a calculated value. */
  sy_zmag_solnid: string | null;
  /**
   * Bibliographic reference for sy_zmag as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  sy_zmag_reflink: string | null;
  /** I magnitude (Cousins). */
  sy_icmag: number | null;
  /** Upper (+) uncertainty of: i magnitude (Cousins). */
  sy_icmagerr1: number | null;
  /** Lower (−) uncertainty of: i magnitude (Cousins). Expressed as a negative value. */
  sy_icmagerr2: number | null;
  /** Whether the uncertainty of sy_icmag is symmetric: 1 = symmetric, 0 = asymmetric. */
  sy_icmagsymerr: number | null;
  /** Limit flag for sy_icmag: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  sy_icmaglim: LimitFlag | null;
  /**
   * sy_icmag formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  sy_icmagstr: string | null;
  /** Display format for sy_icmag (internal archive use; almost always `null`). */
  sy_icmagformat: string | null;
  /** ID of the solution (row in the `ps` table) that sy_icmag was taken from. `null` if it is a calculated value. */
  sy_icmag_solnid: string | null;
  /**
   * Bibliographic reference for sy_icmag as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  sy_icmag_reflink: string | null;
  /** J magnitude (2MASS, near infrared). */
  sy_jmag: number | null;
  /** Upper (+) uncertainty of: j magnitude (2MASS, near infrared). */
  sy_jmagerr1: number | null;
  /** Lower (−) uncertainty of: j magnitude (2MASS, near infrared). Expressed as a negative value. */
  sy_jmagerr2: number | null;
  /** Whether the uncertainty of sy_jmag is symmetric: 1 = symmetric, 0 = asymmetric. */
  sy_jmagsymerr: number | null;
  /** Limit flag for sy_jmag: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  sy_jmaglim: LimitFlag | null;
  /**
   * sy_jmag formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  sy_jmagstr: string | null;
  /** Display format for sy_jmag (internal archive use; almost always `null`). */
  sy_jmagformat: string | null;
  /** ID of the solution (row in the `ps` table) that sy_jmag was taken from. `null` if it is a calculated value. */
  sy_jmag_solnid: string | null;
  /**
   * Bibliographic reference for sy_jmag as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  sy_jmag_reflink: string | null;
  /** H magnitude (2MASS). */
  sy_hmag: number | null;
  /** Upper (+) uncertainty of: h magnitude (2MASS). */
  sy_hmagerr1: number | null;
  /** Lower (−) uncertainty of: h magnitude (2MASS). Expressed as a negative value. */
  sy_hmagerr2: number | null;
  /** Whether the uncertainty of sy_hmag is symmetric: 1 = symmetric, 0 = asymmetric. */
  sy_hmagsymerr: number | null;
  /** Limit flag for sy_hmag: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  sy_hmaglim: LimitFlag | null;
  /**
   * sy_hmag formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  sy_hmagstr: string | null;
  /** Display format for sy_hmag (internal archive use; almost always `null`). */
  sy_hmagformat: string | null;
  /** ID of the solution (row in the `ps` table) that sy_hmag was taken from. `null` if it is a calculated value. */
  sy_hmag_solnid: string | null;
  /**
   * Bibliographic reference for sy_hmag as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  sy_hmag_reflink: string | null;
  /** Ks magnitude (2MASS). */
  sy_kmag: number | null;
  /** Upper (+) uncertainty of: ks magnitude (2MASS). */
  sy_kmagerr1: number | null;
  /** Lower (−) uncertainty of: ks magnitude (2MASS). Expressed as a negative value. */
  sy_kmagerr2: number | null;
  /** Whether the uncertainty of sy_kmag is symmetric: 1 = symmetric, 0 = asymmetric. */
  sy_kmagsymerr: number | null;
  /** Limit flag for sy_kmag: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  sy_kmaglim: LimitFlag | null;
  /**
   * sy_kmag formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  sy_kmagstr: string | null;
  /** Display format for sy_kmag (internal archive use; almost always `null`). */
  sy_kmagformat: string | null;
  /** ID of the solution (row in the `ps` table) that sy_kmag was taken from. `null` if it is a calculated value. */
  sy_kmag_solnid: string | null;
  /**
   * Bibliographic reference for sy_kmag as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  sy_kmag_reflink: string | null;
  /** W1 magnitude (WISE, 3.4 µm). */
  sy_w1mag: number | null;
  /** Upper (+) uncertainty of: w1 magnitude (WISE, 3.4 µm). */
  sy_w1magerr1: number | null;
  /** Lower (−) uncertainty of: w1 magnitude (WISE, 3.4 µm). Expressed as a negative value. */
  sy_w1magerr2: number | null;
  /** Whether the uncertainty of sy_w1mag is symmetric: 1 = symmetric, 0 = asymmetric. */
  sy_w1magsymerr: number | null;
  /** Limit flag for sy_w1mag: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  sy_w1maglim: LimitFlag | null;
  /**
   * sy_w1mag formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  sy_w1magstr: string | null;
  /** Display format for sy_w1mag (internal archive use; almost always `null`). */
  sy_w1magformat: string | null;
  /** ID of the solution (row in the `ps` table) that sy_w1mag was taken from. `null` if it is a calculated value. */
  sy_w1mag_solnid: string | null;
  /**
   * Bibliographic reference for sy_w1mag as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  sy_w1mag_reflink: string | null;
  /** W2 magnitude (WISE, 4.6 µm). */
  sy_w2mag: number | null;
  /** Upper (+) uncertainty of: w2 magnitude (WISE, 4.6 µm). */
  sy_w2magerr1: number | null;
  /** Lower (−) uncertainty of: w2 magnitude (WISE, 4.6 µm). Expressed as a negative value. */
  sy_w2magerr2: number | null;
  /** Whether the uncertainty of sy_w2mag is symmetric: 1 = symmetric, 0 = asymmetric. */
  sy_w2magsymerr: number | null;
  /** Limit flag for sy_w2mag: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  sy_w2maglim: LimitFlag | null;
  /**
   * sy_w2mag formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  sy_w2magstr: string | null;
  /** Display format for sy_w2mag (internal archive use; almost always `null`). */
  sy_w2magformat: string | null;
  /** ID of the solution (row in the `ps` table) that sy_w2mag was taken from. `null` if it is a calculated value. */
  sy_w2mag_solnid: string | null;
  /**
   * Bibliographic reference for sy_w2mag as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  sy_w2mag_reflink: string | null;
  /** W3 magnitude (WISE, 12 µm). */
  sy_w3mag: number | null;
  /** Upper (+) uncertainty of: w3 magnitude (WISE, 12 µm). */
  sy_w3magerr1: number | null;
  /** Lower (−) uncertainty of: w3 magnitude (WISE, 12 µm). Expressed as a negative value. */
  sy_w3magerr2: number | null;
  /** Whether the uncertainty of sy_w3mag is symmetric: 1 = symmetric, 0 = asymmetric. */
  sy_w3magsymerr: number | null;
  /** Limit flag for sy_w3mag: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  sy_w3maglim: LimitFlag | null;
  /**
   * sy_w3mag formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  sy_w3magstr: string | null;
  /** Display format for sy_w3mag (internal archive use; almost always `null`). */
  sy_w3magformat: string | null;
  /** ID of the solution (row in the `ps` table) that sy_w3mag was taken from. `null` if it is a calculated value. */
  sy_w3mag_solnid: string | null;
  /**
   * Bibliographic reference for sy_w3mag as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  sy_w3mag_reflink: string | null;
  /** W4 magnitude (WISE, 22 µm). */
  sy_w4mag: number | null;
  /** Upper (+) uncertainty of: w4 magnitude (WISE, 22 µm). */
  sy_w4magerr1: number | null;
  /** Lower (−) uncertainty of: w4 magnitude (WISE, 22 µm). Expressed as a negative value. */
  sy_w4magerr2: number | null;
  /** Whether the uncertainty of sy_w4mag is symmetric: 1 = symmetric, 0 = asymmetric. */
  sy_w4magsymerr: number | null;
  /** Limit flag for sy_w4mag: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  sy_w4maglim: LimitFlag | null;
  /**
   * sy_w4mag formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  sy_w4magstr: string | null;
  /** Display format for sy_w4mag (internal archive use; almost always `null`). */
  sy_w4magformat: string | null;
  /** ID of the solution (row in the `ps` table) that sy_w4mag was taken from. `null` if it is a calculated value. */
  sy_w4mag_solnid: string | null;
  /**
   * Bibliographic reference for sy_w4mag as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  sy_w4mag_reflink: string | null;
  /** Gaia G magnitude. */
  sy_gaiamag: number | null;
  /** Upper (+) uncertainty of: gaia G magnitude. */
  sy_gaiamagerr1: number | null;
  /** Lower (−) uncertainty of: gaia G magnitude. Expressed as a negative value. */
  sy_gaiamagerr2: number | null;
  /** Whether the uncertainty of sy_gaiamag is symmetric: 1 = symmetric, 0 = asymmetric. */
  sy_gaiamagsymerr: number | null;
  /** Limit flag for sy_gaiamag: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  sy_gaiamaglim: LimitFlag | null;
  /**
   * sy_gaiamag formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  sy_gaiamagstr: string | null;
  /** Display format for sy_gaiamag (internal archive use; almost always `null`). */
  sy_gaiamagformat: string | null;
  /** ID of the solution (row in the `ps` table) that sy_gaiamag was taken from. `null` if it is a calculated value. */
  sy_gaiamag_solnid: string | null;
  /**
   * Bibliographic reference for sy_gaiamag as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  sy_gaiamag_reflink: string | null;
  /** TESS band magnitude. */
  sy_tmag: number | null;
  /** Upper (+) uncertainty of: tESS band magnitude. */
  sy_tmagerr1: number | null;
  /** Lower (−) uncertainty of: tESS band magnitude. Expressed as a negative value. */
  sy_tmagerr2: number | null;
  /** Whether the uncertainty of sy_tmag is symmetric: 1 = symmetric, 0 = asymmetric. */
  sy_tmagsymerr: number | null;
  /** Limit flag for sy_tmag: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  sy_tmaglim: LimitFlag | null;
  /**
   * sy_tmag formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  sy_tmagstr: string | null;
  /** Display format for sy_tmag (internal archive use; almost always `null`). */
  sy_tmagformat: string | null;
  /** ID of the solution (row in the `ps` table) that sy_tmag was taken from. `null` if it is a calculated value. */
  sy_tmag_solnid: string | null;
  /**
   * Bibliographic reference for sy_tmag as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  sy_tmag_reflink: string | null;
  /** Kepler band magnitude. */
  sy_kepmag: number | null;
  /** Upper (+) uncertainty of: kepler band magnitude. */
  sy_kepmagerr1: number | null;
  /** Lower (−) uncertainty of: kepler band magnitude. Expressed as a negative value. */
  sy_kepmagerr2: number | null;
  /** Whether the uncertainty of sy_kepmag is symmetric: 1 = symmetric, 0 = asymmetric. */
  sy_kepmagsymerr: number | null;
  /** Limit flag for sy_kepmag: 0 = measurement, 1 = upper limit, -1 = lower limit. */
  sy_kepmaglim: LimitFlag | null;
  /**
   * sy_kepmag formatted for display together with its uncertainties.
   * May contain HTML (`<div>`, `<span>`) and entities such as `&plusmn;` or `&gt;`.
   */
  sy_kepmagstr: string | null;
  /**
   * Display format for sy_kepmag (internal archive use; almost always `null`).
   * Note: the API names it `sy_kepformat`, not `sy_kepmagformat`.
   */
  sy_kepformat: string | null;
  /** ID of the solution (row in the `ps` table) that sy_kepmag was taken from. `null` if it is a calculated value. */
  sy_kepmag_solnid: string | null;
  /**
   * Bibliographic reference for sy_kepmag as an HTML `<a>` link (usually to NASA ADS).
   * If the archive calculated the value, the link text is "Calculated Value".
   */
  sy_kepmag_reflink: string | null;
}
