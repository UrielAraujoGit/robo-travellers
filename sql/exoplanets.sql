-- Table `exoplanets`: one row per confirmed planet, mirroring the `pscomppars`
-- table (Planetary Systems Composite Parameters) of the NASA Exoplanet Archive.
-- Dialect: PostgreSQL.

CREATE TABLE exoplanets (
    -- Identifiers and names
    systemid text NOT NULL,
    sy_name text NOT NULL,
    objectid text NOT NULL,
    pl_name text NOT NULL,
    pl_letter text NOT NULL,
    hostid text NOT NULL,
    hostname text NOT NULL,
    hd_name text,
    hip_name text,
    tic_id text,
    gaia_dr2_id text,
    gaia_dr3_id text,

    -- Detection flags (1 = the planet was detected/observed with that method)
    ttv_flag smallint NOT NULL CHECK (ttv_flag IN (0, 1)),
    ptv_flag smallint NOT NULL CHECK (ptv_flag IN (0, 1)),
    tran_flag smallint NOT NULL CHECK (tran_flag IN (0, 1)),
    rv_flag smallint NOT NULL CHECK (rv_flag IN (0, 1)),
    ast_flag smallint NOT NULL CHECK (ast_flag IN (0, 1)),
    obm_flag smallint NOT NULL CHECK (obm_flag IN (0, 1)),
    micro_flag smallint NOT NULL CHECK (micro_flag IN (0, 1)),
    etv_flag smallint NOT NULL CHECK (etv_flag IN (0, 1)),
    ima_flag smallint NOT NULL CHECK (ima_flag IN (0, 1)),
    dkin_flag smallint NOT NULL CHECK (dkin_flag IN (0, 1)),
    pul_flag smallint NOT NULL CHECK (pul_flag IN (0, 1)),
    pl_controv_flag smallint NOT NULL CHECK (pl_controv_flag IN (0, 1)),
    cb_flag smallint NOT NULL CHECK (cb_flag IN (0, 1)),

    -- Discovery
    pl_pubdate text,
    disc_pubdate text,
    disc_year integer NOT NULL,
    disc_refid integer,
    disc_method text,
    discoverymethod text NOT NULL,
    disc_locale text,
    disc_facility text,
    disc_instrument text,
    disc_telescope text,
    disc_refname text,

    -- System counts and available data
    sy_snum integer NOT NULL,
    sy_pnum integer NOT NULL,
    sy_mnum integer NOT NULL,
    st_nphot integer NOT NULL,
    st_nrvc integer NOT NULL,
    st_nspec integer NOT NULL,
    pl_nespec integer NOT NULL,
    pl_ntranspec integer NOT NULL,
    pl_ndispec integer NOT NULL,
    pl_nnotes integer NOT NULL,
    pl_nobs_jwst_tran integer NOT NULL,
    pl_nobs_jwst_e integer NOT NULL,
    pl_nobs_jwst_di integer NOT NULL,
    pl_nobs_jwst_pc integer NOT NULL,

    -- Position on the sky
    ra double precision,
    raerr1 double precision,
    raerr2 double precision,
    rasymerr smallint CHECK (rasymerr IN (0, 1)),
    rastr text,
    ra_solnid text,
    ra_reflink text,
    dec double precision,
    decerr1 double precision,
    decerr2 double precision,
    decsymerr smallint CHECK (decsymerr IN (0, 1)),
    decstr text,
    dec_solnid text,
    dec_reflink text,
    glon double precision,
    glonerr1 double precision,
    glonerr2 double precision,
    glonsymerr smallint CHECK (glonsymerr IN (0, 1)),
    glonstr text,
    glon_solnid text,
    glon_reflink text,
    glat double precision,
    glaterr1 double precision,
    glaterr2 double precision,
    glatsymerr smallint CHECK (glatsymerr IN (0, 1)),
    glatstr text,
    glat_solnid text,
    glat_reflink text,
    elon double precision,
    elonerr1 double precision,
    elonerr2 double precision,
    elonsymerr smallint CHECK (elonsymerr IN (0, 1)),
    elonstr text,
    elon_solnid text,
    elon_reflink text,
    elat double precision,
    elaterr1 double precision,
    elaterr2 double precision,
    elatsymerr smallint CHECK (elatsymerr IN (0, 1)),
    elatstr text,
    elat_solnid text,
    elat_reflink text,
    x double precision,
    y double precision,
    z double precision,
    htm20 double precision,

    -- Planet orbit
    pl_orbper double precision,
    pl_orbpererr1 double precision,
    pl_orbpererr2 double precision,
    pl_orbpersymerr smallint CHECK (pl_orbpersymerr IN (0, 1)),
    pl_orbperlim smallint,
    pl_orbperstr text,
    pl_orbperformat text,
    pl_orbper_solnid text,
    pl_orbper_reflink text,
    pl_orbsmax double precision,
    pl_orbsmaxerr1 double precision,
    pl_orbsmaxerr2 double precision,
    pl_orbsmaxsymerr smallint CHECK (pl_orbsmaxsymerr IN (0, 1)),
    pl_orbsmaxlim smallint,
    pl_orbsmaxstr text,
    pl_orbsmaxformat text,
    pl_orbsmax_solnid text,
    pl_orbsmax_reflink text,
    pl_orbeccen double precision,
    pl_orbeccenerr1 double precision,
    pl_orbeccenerr2 double precision,
    pl_orbeccensymerr smallint CHECK (pl_orbeccensymerr IN (0, 1)),
    pl_orbeccenlim smallint,
    pl_orbeccenstr text,
    pl_orbeccenformat text,
    pl_orbeccen_solnid text,
    pl_orbeccen_reflink text,
    pl_orbincl double precision,
    pl_orbinclerr1 double precision,
    pl_orbinclerr2 double precision,
    pl_orbinclsymerr smallint CHECK (pl_orbinclsymerr IN (0, 1)),
    pl_orbincllim smallint,
    pl_orbinclstr text,
    pl_orbinclformat text,
    pl_orbincl_solnid text,
    pl_orbincl_reflink text,
    pl_orblper double precision,
    pl_orblpererr1 double precision,
    pl_orblpererr2 double precision,
    pl_orblpersymerr smallint CHECK (pl_orblpersymerr IN (0, 1)),
    pl_orblperlim smallint,
    pl_orblperstr text,
    pl_orblperformat text,
    pl_orblper_solnid text,
    pl_orblper_reflink text,
    pl_orbtper double precision,
    pl_orbtpererr1 double precision,
    pl_orbtpererr2 double precision,
    pl_orbtpersymerr smallint CHECK (pl_orbtpersymerr IN (0, 1)),
    pl_orbtperlim smallint,
    pl_orbtperstr text,
    pl_orbtperformat text,
    pl_orbtper_solnid text,
    pl_orbtper_reflink text,
    pl_orbtper_systemref text,
    pl_angsep double precision,
    pl_angseperr1 double precision,
    pl_angseperr2 double precision,
    pl_angsepsymerr smallint CHECK (pl_angsepsymerr IN (0, 1)),
    pl_angseplim smallint,
    pl_angsepstr text,
    pl_angsepformat text,
    pl_angsep_solnid text,
    pl_angsep_reflink text,

    -- Transit and occultation
    pl_tranmid double precision,
    pl_tranmiderr1 double precision,
    pl_tranmiderr2 double precision,
    pl_tranmidsymerr smallint CHECK (pl_tranmidsymerr IN (0, 1)),
    pl_tranmidlim smallint,
    pl_tranmidstr text,
    pl_tranmidformat text,
    pl_tranmid_solnid text,
    pl_tranmid_reflink text,
    pl_tranmid_systemref text,
    pl_trandur double precision,
    pl_trandurerr1 double precision,
    pl_trandurerr2 double precision,
    pl_trandursymerr smallint CHECK (pl_trandursymerr IN (0, 1)),
    pl_trandurlim smallint,
    pl_trandurstr text,
    pl_trandurformat text,
    pl_trandur_solnid text,
    pl_trandur_reflink text,
    pl_trandep double precision,
    pl_trandeperr1 double precision,
    pl_trandeperr2 double precision,
    pl_trandepsymerr smallint CHECK (pl_trandepsymerr IN (0, 1)),
    pl_trandeplim smallint,
    pl_trandepstr text,
    pl_trandepformat text,
    pl_trandep_solnid text,
    pl_trandep_reflink text,
    pl_occdep double precision,
    pl_occdeperr1 double precision,
    pl_occdeperr2 double precision,
    pl_occdepsymerr smallint CHECK (pl_occdepsymerr IN (0, 1)),
    pl_occdeplim smallint,
    pl_occdepstr text,
    pl_occdepformat text,
    pl_occdep_solnid text,
    pl_occdep_reflink text,
    pl_ratror double precision,
    pl_ratrorerr1 double precision,
    pl_ratrorerr2 double precision,
    pl_ratrorsymerr smallint CHECK (pl_ratrorsymerr IN (0, 1)),
    pl_ratrorlim smallint,
    pl_ratrorstr text,
    pl_ratrorformat text,
    pl_ratror_solnid text,
    pl_ratror_reflink text,
    pl_ratdor double precision,
    pl_ratdorerr1 double precision,
    pl_ratdorerr2 double precision,
    pl_ratdorsymerr smallint CHECK (pl_ratdorsymerr IN (0, 1)),
    pl_ratdorlim smallint,
    pl_ratdorstr text,
    pl_ratdorformat text,
    pl_ratdor_solnid text,
    pl_ratdor_reflink text,
    pl_imppar double precision,
    pl_impparerr1 double precision,
    pl_impparerr2 double precision,
    pl_impparsymerr smallint CHECK (pl_impparsymerr IN (0, 1)),
    pl_impparlim smallint,
    pl_impparstr text,
    pl_impparformat text,
    pl_imppar_solnid text,
    pl_imppar_reflink text,
    pl_projobliq double precision,
    pl_projobliqerr1 double precision,
    pl_projobliqerr2 double precision,
    pl_projobliqsymerr smallint CHECK (pl_projobliqsymerr IN (0, 1)),
    pl_projobliqlim smallint,
    pl_projobliqstr text,
    pl_projobliqformat text,
    pl_projobliq_solnid text,
    pl_projobliq_reflink text,
    pl_trueobliq double precision,
    pl_trueobliqerr1 double precision,
    pl_trueobliqerr2 double precision,
    pl_trueobliqsymerr smallint CHECK (pl_trueobliqsymerr IN (0, 1)),
    pl_trueobliqlim smallint,
    pl_trueobliqstr text,
    pl_trueobliqformat text,
    pl_trueobliq_solnid text,
    pl_trueobliq_reflink text,

    -- Planet size, mass and physical properties
    pl_rade double precision,
    pl_radeerr1 double precision,
    pl_radeerr2 double precision,
    pl_radesymerr smallint CHECK (pl_radesymerr IN (0, 1)),
    pl_radelim smallint,
    pl_radestr text,
    pl_radeformat text,
    pl_rade_solnid text,
    pl_rade_reflink text,
    pl_radj double precision,
    pl_radjerr1 double precision,
    pl_radjerr2 double precision,
    pl_radjsymerr smallint CHECK (pl_radjsymerr IN (0, 1)),
    pl_radjlim smallint,
    pl_radjstr text,
    pl_radjformat text,
    pl_radj_solnid text,
    pl_radj_reflink text,
    pl_masse double precision,
    pl_masseerr1 double precision,
    pl_masseerr2 double precision,
    pl_massesymerr smallint CHECK (pl_massesymerr IN (0, 1)),
    pl_masselim smallint,
    pl_massestr text,
    pl_masseformat text,
    pl_masse_solnid text,
    pl_masse_reflink text,
    pl_massj double precision,
    pl_massjerr1 double precision,
    pl_massjerr2 double precision,
    pl_massjsymerr smallint CHECK (pl_massjsymerr IN (0, 1)),
    pl_massjlim smallint,
    pl_massjstr text,
    pl_massjformat text,
    pl_massj_solnid text,
    pl_massj_reflink text,
    pl_msinie double precision,
    pl_msinieerr1 double precision,
    pl_msinieerr2 double precision,
    pl_msiniesymerr smallint CHECK (pl_msiniesymerr IN (0, 1)),
    pl_msinielim smallint,
    pl_msiniestr text,
    pl_msinieformat text,
    pl_msinie_solnid text,
    pl_msinie_reflink text,
    pl_msinij double precision,
    pl_msinijerr1 double precision,
    pl_msinijerr2 double precision,
    pl_msinijsymerr smallint CHECK (pl_msinijsymerr IN (0, 1)),
    pl_msinijlim smallint,
    pl_msinijstr text,
    pl_msinijformat text,
    pl_msinij_solnid text,
    pl_msinij_reflink text,
    pl_cmasse double precision,
    pl_cmasseerr1 double precision,
    pl_cmasseerr2 double precision,
    pl_cmassesymerr smallint CHECK (pl_cmassesymerr IN (0, 1)),
    pl_cmasselim smallint,
    pl_cmassestr text,
    pl_cmasseformat text,
    pl_cmasse_solnid text,
    pl_cmasse_reflink text,
    pl_cmassj double precision,
    pl_cmassjerr1 double precision,
    pl_cmassjerr2 double precision,
    pl_cmassjsymerr smallint CHECK (pl_cmassjsymerr IN (0, 1)),
    pl_cmassjlim smallint,
    pl_cmassjstr text,
    pl_cmassjformat text,
    pl_cmassj_solnid text,
    pl_cmassj_reflink text,
    pl_bmasse double precision,
    pl_bmasseerr1 double precision,
    pl_bmasseerr2 double precision,
    pl_bmassesymerr smallint CHECK (pl_bmassesymerr IN (0, 1)),
    pl_bmasselim smallint,
    pl_bmassestr text,
    pl_bmasseformat text,
    pl_bmasse_solnid text,
    pl_bmasse_reflink text,
    pl_bmassj double precision,
    pl_bmassjerr1 double precision,
    pl_bmassjerr2 double precision,
    pl_bmassjsymerr smallint CHECK (pl_bmassjsymerr IN (0, 1)),
    pl_bmassjlim smallint,
    pl_bmassjstr text,
    pl_bmassjformat text,
    pl_bmassj_solnid text,
    pl_bmassj_reflink text,
    pl_bmassprov text,
    pl_dens double precision,
    pl_denserr1 double precision,
    pl_denserr2 double precision,
    pl_denssymerr smallint CHECK (pl_denssymerr IN (0, 1)),
    pl_denslim smallint,
    pl_densstr text,
    pl_densformat text,
    pl_dens_solnid text,
    pl_dens_reflink text,
    pl_eqt double precision,
    pl_eqterr1 double precision,
    pl_eqterr2 double precision,
    pl_eqtsymerr smallint CHECK (pl_eqtsymerr IN (0, 1)),
    pl_eqtlim smallint,
    pl_eqtstr text,
    pl_eqtformat text,
    pl_eqt_solnid text,
    pl_eqt_reflink text,
    pl_insol double precision,
    pl_insolerr1 double precision,
    pl_insolerr2 double precision,
    pl_insolsymerr smallint CHECK (pl_insolsymerr IN (0, 1)),
    pl_insollim smallint,
    pl_insolstr text,
    pl_insolformat text,
    pl_insol_solnid text,
    pl_insol_reflink text,
    pl_rvamp double precision,
    pl_rvamperr1 double precision,
    pl_rvamperr2 double precision,
    pl_rvampsymerr smallint CHECK (pl_rvampsymerr IN (0, 1)),
    pl_rvamplim smallint,
    pl_rvampstr text,
    pl_rvampformat text,
    pl_rvamp_solnid text,
    pl_rvamp_reflink text,

    -- Spectroscopy metrics (useful for selecting JWST targets)
    pl_tsm double precision,
    pl_tsmerr1 double precision,
    pl_tsmerr2 double precision,
    pl_tsmlim smallint,
    pl_tsmstr text,
    pl_tsm_solnid text,
    pl_tsm_reflink text,
    pl_esm double precision,
    pl_esmerr1 double precision,
    pl_esmerr2 double precision,
    pl_esmlim smallint,
    pl_esmstr text,
    pl_esm_solnid text,
    pl_esm_reflink text,

    -- Host star
    st_spectype text,
    st_spectype_solnid text,
    st_spectype_reflink text,
    st_teff double precision,
    st_tefferr1 double precision,
    st_tefferr2 double precision,
    st_teffsymerr smallint CHECK (st_teffsymerr IN (0, 1)),
    st_tefflim smallint,
    st_teffstr text,
    st_teffformat text,
    st_teff_solnid text,
    st_teff_reflink text,
    st_rad double precision,
    st_raderr1 double precision,
    st_raderr2 double precision,
    st_radsymerr smallint CHECK (st_radsymerr IN (0, 1)),
    st_radlim smallint,
    st_radstr text,
    st_radformat text,
    st_rad_solnid text,
    st_rad_reflink text,
    st_mass double precision,
    st_masserr1 double precision,
    st_masserr2 double precision,
    st_masssymerr smallint CHECK (st_masssymerr IN (0, 1)),
    st_masslim smallint,
    st_massstr text,
    st_massformat text,
    st_mass_solnid text,
    st_mass_reflink text,
    st_dens double precision,
    st_denserr1 double precision,
    st_denserr2 double precision,
    st_denssymerr smallint CHECK (st_denssymerr IN (0, 1)),
    st_denslim smallint,
    st_densstr text,
    st_densformat text,
    st_dens_solnid text,
    st_dens_reflink text,
    st_lum double precision,
    st_lumerr1 double precision,
    st_lumerr2 double precision,
    st_lumsymerr smallint CHECK (st_lumsymerr IN (0, 1)),
    st_lumlim smallint,
    st_lumstr text,
    st_lumformat text,
    st_lum_solnid text,
    st_lum_reflink text,
    st_logg double precision,
    st_loggerr1 double precision,
    st_loggerr2 double precision,
    st_loggsymerr smallint CHECK (st_loggsymerr IN (0, 1)),
    st_logglim smallint,
    st_loggstr text,
    st_loggformat text,
    st_logg_solnid text,
    st_logg_reflink text,
    st_age double precision,
    st_ageerr1 double precision,
    st_ageerr2 double precision,
    st_agesymerr smallint CHECK (st_agesymerr IN (0, 1)),
    st_agelim smallint,
    st_agestr text,
    st_ageformat text,
    st_age_solnid text,
    st_age_reflink text,
    st_met double precision,
    st_meterr1 double precision,
    st_meterr2 double precision,
    st_metsymerr smallint CHECK (st_metsymerr IN (0, 1)),
    st_metlim smallint,
    st_metstr text,
    st_metformat text,
    st_met_solnid text,
    st_met_reflink text,
    st_metratio text,
    st_metn double precision,
    st_log_rhk double precision,
    st_log_rhkerr1 double precision,
    st_log_rhkerr2 double precision,
    st_log_rhksymerr smallint CHECK (st_log_rhksymerr IN (0, 1)),
    st_log_rhklim smallint,
    st_log_rhkstr text,
    st_log_rhkformat text,
    st_log_rhk_solnid text,
    st_log_rhk_reflink text,
    st_vsin double precision,
    st_vsinerr1 double precision,
    st_vsinerr2 double precision,
    st_vsinsymerr smallint CHECK (st_vsinsymerr IN (0, 1)),
    st_vsinlim smallint,
    st_vsinstr text,
    st_vsinformat text,
    st_vsin_solnid text,
    st_vsin_reflink text,
    st_rotp double precision,
    st_rotperr1 double precision,
    st_rotperr2 double precision,
    st_rotpsymerr smallint CHECK (st_rotpsymerr IN (0, 1)),
    st_rotplim smallint,
    st_rotpstr text,
    st_rotpformat text,
    st_rotp_solnid text,
    st_rotp_reflink text,
    st_radv double precision,
    st_radverr1 double precision,
    st_radverr2 double precision,
    st_radvsymerr smallint CHECK (st_radvsymerr IN (0, 1)),
    st_radvlim smallint,
    st_radvstr text,
    st_radvformat text,
    st_radv_solnid text,
    st_radv_reflink text,

    -- System: distance and motion
    sy_dist double precision,
    sy_disterr1 double precision,
    sy_disterr2 double precision,
    sy_distsymerr smallint CHECK (sy_distsymerr IN (0, 1)),
    sy_distlim smallint,
    sy_diststr text,
    sy_distformat text,
    sy_dist_solnid text,
    sy_dist_reflink text,
    sy_plx double precision,
    sy_plxerr1 double precision,
    sy_plxerr2 double precision,
    sy_plxsymerr smallint CHECK (sy_plxsymerr IN (0, 1)),
    sy_plxlim smallint,
    sy_plxstr text,
    sy_plxformat text,
    sy_plx_solnid text,
    sy_plx_reflink text,
    sy_pm double precision,
    sy_pmerr1 double precision,
    sy_pmerr2 double precision,
    sy_pmsymerr smallint CHECK (sy_pmsymerr IN (0, 1)),
    sy_pmlim smallint,
    sy_pmstr text,
    sy_pmformat text,
    sy_pm_solnid text,
    sy_pm_reflink text,
    sy_pmra double precision,
    sy_pmraerr1 double precision,
    sy_pmraerr2 double precision,
    sy_pmrasymerr smallint CHECK (sy_pmrasymerr IN (0, 1)),
    sy_pmralim smallint,
    sy_pmrastr text,
    sy_pmraformat text,
    sy_pmra_solnid text,
    sy_pmra_reflink text,
    sy_pmdec double precision,
    sy_pmdecerr1 double precision,
    sy_pmdecerr2 double precision,
    sy_pmdecsymerr smallint CHECK (sy_pmdecsymerr IN (0, 1)),
    sy_pmdeclim smallint,
    sy_pmdecstr text,
    sy_pmdecformat text,
    sy_pmdec_solnid text,
    sy_pmdec_reflink text,

    -- System: apparent magnitudes (brightness; lower number = brighter)
    sy_bmag double precision,
    sy_bmagerr1 double precision,
    sy_bmagerr2 double precision,
    sy_bmagsymerr smallint CHECK (sy_bmagsymerr IN (0, 1)),
    sy_bmaglim smallint,
    sy_bmagstr text,
    sy_bmagformat text,
    sy_bmag_solnid text,
    sy_bmag_reflink text,
    sy_vmag double precision,
    sy_vmagerr1 double precision,
    sy_vmagerr2 double precision,
    sy_vmagsymerr smallint CHECK (sy_vmagsymerr IN (0, 1)),
    sy_vmaglim smallint,
    sy_vmagstr text,
    sy_vmagformat text,
    sy_vmag_solnid text,
    sy_vmag_reflink text,
    sy_umag double precision,
    sy_umagerr1 double precision,
    sy_umagerr2 double precision,
    sy_umagsymerr smallint CHECK (sy_umagsymerr IN (0, 1)),
    sy_umaglim smallint,
    sy_umagstr text,
    sy_umagformat text,
    sy_umag_solnid text,
    sy_umag_reflink text,
    sy_gmag double precision,
    sy_gmagerr1 double precision,
    sy_gmagerr2 double precision,
    sy_gmagsymerr smallint CHECK (sy_gmagsymerr IN (0, 1)),
    sy_gmaglim smallint,
    sy_gmagstr text,
    sy_gmagformat text,
    sy_gmag_solnid text,
    sy_gmag_reflink text,
    sy_rmag double precision,
    sy_rmagerr1 double precision,
    sy_rmagerr2 double precision,
    sy_rmagsymerr smallint CHECK (sy_rmagsymerr IN (0, 1)),
    sy_rmaglim smallint,
    sy_rmagstr text,
    sy_rmagformat text,
    sy_rmag_solnid text,
    sy_rmag_reflink text,
    sy_imag double precision,
    sy_imagerr1 double precision,
    sy_imagerr2 double precision,
    sy_imagsymerr smallint CHECK (sy_imagsymerr IN (0, 1)),
    sy_imaglim smallint,
    sy_imagstr text,
    sy_imagformat text,
    sy_imag_solnid text,
    sy_imag_reflink text,
    sy_zmag double precision,
    sy_zmagerr1 double precision,
    sy_zmagerr2 double precision,
    sy_zmagsymerr smallint CHECK (sy_zmagsymerr IN (0, 1)),
    sy_zmaglim smallint,
    sy_zmagstr text,
    sy_zmagformat text,
    sy_zmag_solnid text,
    sy_zmag_reflink text,
    sy_icmag double precision,
    sy_icmagerr1 double precision,
    sy_icmagerr2 double precision,
    sy_icmagsymerr smallint CHECK (sy_icmagsymerr IN (0, 1)),
    sy_icmaglim smallint,
    sy_icmagstr text,
    sy_icmagformat text,
    sy_icmag_solnid text,
    sy_icmag_reflink text,
    sy_jmag double precision,
    sy_jmagerr1 double precision,
    sy_jmagerr2 double precision,
    sy_jmagsymerr smallint CHECK (sy_jmagsymerr IN (0, 1)),
    sy_jmaglim smallint,
    sy_jmagstr text,
    sy_jmagformat text,
    sy_jmag_solnid text,
    sy_jmag_reflink text,
    sy_hmag double precision,
    sy_hmagerr1 double precision,
    sy_hmagerr2 double precision,
    sy_hmagsymerr smallint CHECK (sy_hmagsymerr IN (0, 1)),
    sy_hmaglim smallint,
    sy_hmagstr text,
    sy_hmagformat text,
    sy_hmag_solnid text,
    sy_hmag_reflink text,
    sy_kmag double precision,
    sy_kmagerr1 double precision,
    sy_kmagerr2 double precision,
    sy_kmagsymerr smallint CHECK (sy_kmagsymerr IN (0, 1)),
    sy_kmaglim smallint,
    sy_kmagstr text,
    sy_kmagformat text,
    sy_kmag_solnid text,
    sy_kmag_reflink text,
    sy_w1mag double precision,
    sy_w1magerr1 double precision,
    sy_w1magerr2 double precision,
    sy_w1magsymerr smallint CHECK (sy_w1magsymerr IN (0, 1)),
    sy_w1maglim smallint,
    sy_w1magstr text,
    sy_w1magformat text,
    sy_w1mag_solnid text,
    sy_w1mag_reflink text,
    sy_w2mag double precision,
    sy_w2magerr1 double precision,
    sy_w2magerr2 double precision,
    sy_w2magsymerr smallint CHECK (sy_w2magsymerr IN (0, 1)),
    sy_w2maglim smallint,
    sy_w2magstr text,
    sy_w2magformat text,
    sy_w2mag_solnid text,
    sy_w2mag_reflink text,
    sy_w3mag double precision,
    sy_w3magerr1 double precision,
    sy_w3magerr2 double precision,
    sy_w3magsymerr smallint CHECK (sy_w3magsymerr IN (0, 1)),
    sy_w3maglim smallint,
    sy_w3magstr text,
    sy_w3magformat text,
    sy_w3mag_solnid text,
    sy_w3mag_reflink text,
    sy_w4mag double precision,
    sy_w4magerr1 double precision,
    sy_w4magerr2 double precision,
    sy_w4magsymerr smallint CHECK (sy_w4magsymerr IN (0, 1)),
    sy_w4maglim smallint,
    sy_w4magstr text,
    sy_w4magformat text,
    sy_w4mag_solnid text,
    sy_w4mag_reflink text,
    sy_gaiamag double precision,
    sy_gaiamagerr1 double precision,
    sy_gaiamagerr2 double precision,
    sy_gaiamagsymerr smallint CHECK (sy_gaiamagsymerr IN (0, 1)),
    sy_gaiamaglim smallint,
    sy_gaiamagstr text,
    sy_gaiamagformat text,
    sy_gaiamag_solnid text,
    sy_gaiamag_reflink text,
    sy_tmag double precision,
    sy_tmagerr1 double precision,
    sy_tmagerr2 double precision,
    sy_tmagsymerr smallint CHECK (sy_tmagsymerr IN (0, 1)),
    sy_tmaglim smallint,
    sy_tmagstr text,
    sy_tmagformat text,
    sy_tmag_solnid text,
    sy_tmag_reflink text,
    sy_kepmag double precision,
    sy_kepmagerr1 double precision,
    sy_kepmagerr2 double precision,
    sy_kepmagsymerr smallint CHECK (sy_kepmagsymerr IN (0, 1)),
    sy_kepmaglim smallint,
    sy_kepmagstr text,
    sy_kepformat text,
    sy_kepmag_solnid text,
    sy_kepmag_reflink text,

    PRIMARY KEY (pl_name),
    UNIQUE (objectid)
);

CREATE INDEX exoplanets_hostname_idx ON exoplanets (hostname);
CREATE INDEX exoplanets_disc_year_idx ON exoplanets (disc_year);
CREATE INDEX exoplanets_discoverymethod_idx ON exoplanets (discoverymethod);

COMMENT ON TABLE exoplanets IS 'Confirmed exoplanets from the NASA Exoplanet Archive pscomppars table (one row per planet).';
COMMENT ON COLUMN exoplanets.systemid IS 'Internal archive ID of the planetary system.';
COMMENT ON COLUMN exoplanets.sy_name IS 'Name of the planetary system.';
COMMENT ON COLUMN exoplanets.objectid IS 'Internal archive ID of the planet.';
COMMENT ON COLUMN exoplanets.pl_name IS 'Planet name (e.g. "55 Cnc b"). The most practical identifier to use as a key.';
COMMENT ON COLUMN exoplanets.pl_letter IS 'Letter of the planet within its system (b, c, d…), assigned in order of discovery.';
COMMENT ON COLUMN exoplanets.hostid IS 'Internal archive ID of the host star.';
COMMENT ON COLUMN exoplanets.hostname IS 'Name of the host star.';
COMMENT ON COLUMN exoplanets.hd_name IS 'Host star designation in the Henry Draper (HD) catalog.';
COMMENT ON COLUMN exoplanets.hip_name IS 'Host star designation in the Hipparcos (HIP) catalog.';
COMMENT ON COLUMN exoplanets.tic_id IS 'Host star designation in the TESS Input Catalog (TIC).';
COMMENT ON COLUMN exoplanets.gaia_dr2_id IS 'Host star designation in Gaia Data Release 2.';
COMMENT ON COLUMN exoplanets.gaia_dr3_id IS 'Host star designation in Gaia Data Release 3.';
COMMENT ON COLUMN exoplanets.ttv_flag IS 'Shows transit timing variations (TTV).';
COMMENT ON COLUMN exoplanets.ptv_flag IS 'Shows stellar pulsation timing variations.';
COMMENT ON COLUMN exoplanets.tran_flag IS 'Detected by the transit method.';
COMMENT ON COLUMN exoplanets.rv_flag IS 'Detected by radial velocity.';
COMMENT ON COLUMN exoplanets.ast_flag IS 'Detected by astrometry.';
COMMENT ON COLUMN exoplanets.obm_flag IS 'Detected by orbital brightness modulation.';
COMMENT ON COLUMN exoplanets.micro_flag IS 'Detected by gravitational microlensing.';
COMMENT ON COLUMN exoplanets.etv_flag IS 'Detected by eclipse timing variations (eclipsing binaries).';
COMMENT ON COLUMN exoplanets.ima_flag IS 'Detected by direct imaging.';
COMMENT ON COLUMN exoplanets.dkin_flag IS 'Detected by protoplanetary disk kinematics.';
COMMENT ON COLUMN exoplanets.pul_flag IS 'Detected by pulsar timing.';
COMMENT ON COLUMN exoplanets.pl_controv_flag IS 'Its existence is disputed in the literature (1 = controversial).';
COMMENT ON COLUMN exoplanets.cb_flag IS 'Circumbinary: it orbits two stars.';
COMMENT ON COLUMN exoplanets.pl_pubdate IS 'Publication date (YYYY-MM) of the planet parameters.';
COMMENT ON COLUMN exoplanets.disc_pubdate IS 'Publication date of the discovery (YYYY-MM).';
COMMENT ON COLUMN exoplanets.disc_year IS 'Year of discovery.';
COMMENT ON COLUMN exoplanets.disc_refid IS 'Internal ID of the discovery reference.';
COMMENT ON COLUMN exoplanets.disc_method IS 'Short code of the discovery method (e.g. "rv", "tran").';
COMMENT ON COLUMN exoplanets.discoverymethod IS 'Full name of the discovery method (e.g. "Radial Velocity", "Transit").';
COMMENT ON COLUMN exoplanets.disc_locale IS 'Whether the discovery was made from the ground, from space, or both.';
COMMENT ON COLUMN exoplanets.disc_facility IS 'Observatory or mission that made the discovery (e.g. "Kepler", "Lick Observatory").';
COMMENT ON COLUMN exoplanets.disc_instrument IS 'Instrument used for the discovery.';
COMMENT ON COLUMN exoplanets.disc_telescope IS 'Telescope used for the discovery.';
COMMENT ON COLUMN exoplanets.disc_refname IS 'Reference to the discovery paper as an HTML <a> link.';
COMMENT ON COLUMN exoplanets.sy_snum IS 'Number of stars in the system.';
COMMENT ON COLUMN exoplanets.sy_pnum IS 'Number of confirmed planets in the system.';
COMMENT ON COLUMN exoplanets.sy_mnum IS 'Number of known moons in the system.';
COMMENT ON COLUMN exoplanets.st_nphot IS 'Number of photometric time series for the star in the archive.';
COMMENT ON COLUMN exoplanets.st_nrvc IS 'Number of radial velocity curves for the star in the archive.';
COMMENT ON COLUMN exoplanets.st_nspec IS 'Number of stellar spectra in the archive.';
COMMENT ON COLUMN exoplanets.pl_nespec IS 'Number of emission spectra for the planet in the archive.';
COMMENT ON COLUMN exoplanets.pl_ntranspec IS 'Number of transmission spectra for the planet in the archive.';
COMMENT ON COLUMN exoplanets.pl_ndispec IS 'Number of direct imaging spectra for the planet in the archive.';
COMMENT ON COLUMN exoplanets.pl_nnotes IS 'Number of notes the archive holds about the planet.';
COMMENT ON COLUMN exoplanets.pl_nobs_jwst_tran IS 'Number of JWST observations of the planet''s transits.';
COMMENT ON COLUMN exoplanets.pl_nobs_jwst_e IS 'Number of JWST observations of the planet''s eclipses (emission).';
COMMENT ON COLUMN exoplanets.pl_nobs_jwst_di IS 'Number of JWST direct imaging observations.';
COMMENT ON COLUMN exoplanets.pl_nobs_jwst_pc IS 'Number of JWST phase curve observations of the planet.';
COMMENT ON COLUMN exoplanets.ra IS 'Right ascension (J2000) [decimal degrees]. rastr gives it in sexagesimal format (e.g. "08h52m35.24s").';
COMMENT ON COLUMN exoplanets.raerr1 IS 'Upper (+) uncertainty of: right ascension (J2000) [decimal degrees].';
COMMENT ON COLUMN exoplanets.raerr2 IS 'Lower (-) uncertainty of: right ascension (J2000) [decimal degrees]. Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.rasymerr IS 'Whether the uncertainty of ra is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.rastr IS 'ra formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.ra_solnid IS 'ID of the solution (row in the ps table) that ra was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.ra_reflink IS 'Bibliographic reference for ra as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.dec IS 'Declination (J2000) [decimal degrees]. decstr gives it in sexagesimal format (e.g. "+28d19m47.34s").';
COMMENT ON COLUMN exoplanets.decerr1 IS 'Upper (+) uncertainty of: declination (J2000) [decimal degrees].';
COMMENT ON COLUMN exoplanets.decerr2 IS 'Lower (-) uncertainty of: declination (J2000) [decimal degrees]. Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.decsymerr IS 'Whether the uncertainty of dec is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.decstr IS 'dec formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.dec_solnid IS 'ID of the solution (row in the ps table) that dec was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.dec_reflink IS 'Bibliographic reference for dec as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.glon IS 'Galactic longitude [degrees].';
COMMENT ON COLUMN exoplanets.glonerr1 IS 'Upper (+) uncertainty of: galactic longitude [degrees].';
COMMENT ON COLUMN exoplanets.glonerr2 IS 'Lower (-) uncertainty of: galactic longitude [degrees]. Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.glonsymerr IS 'Whether the uncertainty of glon is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.glonstr IS 'glon formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.glon_solnid IS 'ID of the solution (row in the ps table) that glon was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.glon_reflink IS 'Bibliographic reference for glon as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.glat IS 'Galactic latitude [degrees].';
COMMENT ON COLUMN exoplanets.glaterr1 IS 'Upper (+) uncertainty of: galactic latitude [degrees].';
COMMENT ON COLUMN exoplanets.glaterr2 IS 'Lower (-) uncertainty of: galactic latitude [degrees]. Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.glatsymerr IS 'Whether the uncertainty of glat is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.glatstr IS 'glat formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.glat_solnid IS 'ID of the solution (row in the ps table) that glat was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.glat_reflink IS 'Bibliographic reference for glat as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.elon IS 'Ecliptic longitude [degrees].';
COMMENT ON COLUMN exoplanets.elonerr1 IS 'Upper (+) uncertainty of: ecliptic longitude [degrees].';
COMMENT ON COLUMN exoplanets.elonerr2 IS 'Lower (-) uncertainty of: ecliptic longitude [degrees]. Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.elonsymerr IS 'Whether the uncertainty of elon is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.elonstr IS 'elon formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.elon_solnid IS 'ID of the solution (row in the ps table) that elon was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.elon_reflink IS 'Bibliographic reference for elon as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.elat IS 'Ecliptic latitude [degrees].';
COMMENT ON COLUMN exoplanets.elaterr1 IS 'Upper (+) uncertainty of: ecliptic latitude [degrees].';
COMMENT ON COLUMN exoplanets.elaterr2 IS 'Lower (-) uncertainty of: ecliptic latitude [degrees]. Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.elatsymerr IS 'Whether the uncertainty of elat is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.elatstr IS 'elat formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.elat_solnid IS 'ID of the solution (row in the ps table) that elat was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.elat_reflink IS 'Bibliographic reference for elat as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.x IS 'Cartesian X coordinate of the unit sky-position vector (internal use for spatial searches).';
COMMENT ON COLUMN exoplanets.y IS 'Cartesian Y coordinate of the unit sky-position vector.';
COMMENT ON COLUMN exoplanets.z IS 'Cartesian Z coordinate of the unit sky-position vector.';
COMMENT ON COLUMN exoplanets.htm20 IS 'Level-20 HTM (Hierarchical Triangular Mesh) index, used to index sky positions.';
COMMENT ON COLUMN exoplanets.pl_orbper IS 'Orbital period: the time it takes to complete one orbit around its star [days].';
COMMENT ON COLUMN exoplanets.pl_orbpererr1 IS 'Upper (+) uncertainty of: orbital period: the time it takes to complete one orbit around its star [days].';
COMMENT ON COLUMN exoplanets.pl_orbpererr2 IS 'Lower (-) uncertainty of: orbital period: the time it takes to complete one orbit around its star [days]. Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.pl_orbpersymerr IS 'Whether the uncertainty of pl_orbper is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.pl_orbperlim IS 'Limit flag for pl_orbper: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.pl_orbperstr IS 'pl_orbper formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.pl_orbperformat IS 'Display format for pl_orbper (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.pl_orbper_solnid IS 'ID of the solution (row in the ps table) that pl_orbper was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.pl_orbper_reflink IS 'Bibliographic reference for pl_orbper as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.pl_orbsmax IS 'Orbit semi-major axis (mean distance from the star) [AU, astronomical units].';
COMMENT ON COLUMN exoplanets.pl_orbsmaxerr1 IS 'Upper (+) uncertainty of: orbit semi-major axis (mean distance from the star) [AU, astronomical units].';
COMMENT ON COLUMN exoplanets.pl_orbsmaxerr2 IS 'Lower (-) uncertainty of: orbit semi-major axis (mean distance from the star) [AU, astronomical units]. Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.pl_orbsmaxsymerr IS 'Whether the uncertainty of pl_orbsmax is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.pl_orbsmaxlim IS 'Limit flag for pl_orbsmax: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.pl_orbsmaxstr IS 'pl_orbsmax formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.pl_orbsmaxformat IS 'Display format for pl_orbsmax (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.pl_orbsmax_solnid IS 'ID of the solution (row in the ps table) that pl_orbsmax was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.pl_orbsmax_reflink IS 'Bibliographic reference for pl_orbsmax as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.pl_orbeccen IS 'Orbital eccentricity: 0 = circular, close to 1 = highly elongated.';
COMMENT ON COLUMN exoplanets.pl_orbeccenerr1 IS 'Upper (+) uncertainty of: orbital eccentricity: 0 = circular, close to 1 = highly elongated.';
COMMENT ON COLUMN exoplanets.pl_orbeccenerr2 IS 'Lower (-) uncertainty of: orbital eccentricity: 0 = circular, close to 1 = highly elongated. Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.pl_orbeccensymerr IS 'Whether the uncertainty of pl_orbeccen is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.pl_orbeccenlim IS 'Limit flag for pl_orbeccen: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.pl_orbeccenstr IS 'pl_orbeccen formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.pl_orbeccenformat IS 'Display format for pl_orbeccen (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.pl_orbeccen_solnid IS 'ID of the solution (row in the ps table) that pl_orbeccen was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.pl_orbeccen_reflink IS 'Bibliographic reference for pl_orbeccen as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.pl_orbincl IS 'Orbital inclination relative to the plane of the sky; ~90° means we see it edge-on [degrees].';
COMMENT ON COLUMN exoplanets.pl_orbinclerr1 IS 'Upper (+) uncertainty of: orbital inclination relative to the plane of the sky; ~90° means we see it edge-on [degrees].';
COMMENT ON COLUMN exoplanets.pl_orbinclerr2 IS 'Lower (-) uncertainty of: orbital inclination relative to the plane of the sky; ~90° means we see it edge-on [degrees]. Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.pl_orbinclsymerr IS 'Whether the uncertainty of pl_orbincl is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.pl_orbincllim IS 'Limit flag for pl_orbincl: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.pl_orbinclstr IS 'pl_orbincl formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.pl_orbinclformat IS 'Display format for pl_orbincl (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.pl_orbincl_solnid IS 'ID of the solution (row in the ps table) that pl_orbincl was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.pl_orbincl_reflink IS 'Bibliographic reference for pl_orbincl as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.pl_orblper IS 'Argument of periastron (orientation of the elliptical orbit) [degrees].';
COMMENT ON COLUMN exoplanets.pl_orblpererr1 IS 'Upper (+) uncertainty of: argument of periastron (orientation of the elliptical orbit) [degrees].';
COMMENT ON COLUMN exoplanets.pl_orblpererr2 IS 'Lower (-) uncertainty of: argument of periastron (orientation of the elliptical orbit) [degrees]. Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.pl_orblpersymerr IS 'Whether the uncertainty of pl_orblper is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.pl_orblperlim IS 'Limit flag for pl_orblper: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.pl_orblperstr IS 'pl_orblper formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.pl_orblperformat IS 'Display format for pl_orblper (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.pl_orblper_solnid IS 'ID of the solution (row in the ps table) that pl_orblper was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.pl_orblper_reflink IS 'Bibliographic reference for pl_orblper as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.pl_orbtper IS 'Epoch of periastron: time when the planet passes the point closest to the star [days].';
COMMENT ON COLUMN exoplanets.pl_orbtpererr1 IS 'Upper (+) uncertainty of: epoch of periastron: time when the planet passes the point closest to the star [days].';
COMMENT ON COLUMN exoplanets.pl_orbtpererr2 IS 'Lower (-) uncertainty of: epoch of periastron: time when the planet passes the point closest to the star [days]. Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.pl_orbtpersymerr IS 'Whether the uncertainty of pl_orbtper is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.pl_orbtperlim IS 'Limit flag for pl_orbtper: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.pl_orbtperstr IS 'pl_orbtper formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.pl_orbtperformat IS 'Display format for pl_orbtper (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.pl_orbtper_solnid IS 'ID of the solution (row in the ps table) that pl_orbtper was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.pl_orbtper_reflink IS 'Bibliographic reference for pl_orbtper as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.pl_orbtper_systemref IS 'Time system in which pl_orbtper is expressed (e.g. "JD", "BJD").';
COMMENT ON COLUMN exoplanets.pl_angsep IS 'Calculated angular separation between the planet and its star as seen from Earth [mas, milliarcseconds].';
COMMENT ON COLUMN exoplanets.pl_angseperr1 IS 'Upper (+) uncertainty of: calculated angular separation between the planet and its star as seen from Earth [mas, milliarcseconds].';
COMMENT ON COLUMN exoplanets.pl_angseperr2 IS 'Lower (-) uncertainty of: calculated angular separation between the planet and its star as seen from Earth [mas, milliarcseconds]. Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.pl_angsepsymerr IS 'Whether the uncertainty of pl_angsep is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.pl_angseplim IS 'Limit flag for pl_angsep: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.pl_angsepstr IS 'pl_angsep formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.pl_angsepformat IS 'Display format for pl_angsep (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.pl_angsep_solnid IS 'ID of the solution (row in the ps table) that pl_angsep was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.pl_angsep_reflink IS 'Bibliographic reference for pl_angsep as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.pl_tranmid IS 'Transit mid-point time (reference epoch for predicting transits) [days].';
COMMENT ON COLUMN exoplanets.pl_tranmiderr1 IS 'Upper (+) uncertainty of: transit mid-point time (reference epoch for predicting transits) [days].';
COMMENT ON COLUMN exoplanets.pl_tranmiderr2 IS 'Lower (-) uncertainty of: transit mid-point time (reference epoch for predicting transits) [days]. Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.pl_tranmidsymerr IS 'Whether the uncertainty of pl_tranmid is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.pl_tranmidlim IS 'Limit flag for pl_tranmid: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.pl_tranmidstr IS 'pl_tranmid formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.pl_tranmidformat IS 'Display format for pl_tranmid (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.pl_tranmid_solnid IS 'ID of the solution (row in the ps table) that pl_tranmid was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.pl_tranmid_reflink IS 'Bibliographic reference for pl_tranmid as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.pl_tranmid_systemref IS 'Time system in which pl_tranmid is expressed (e.g. "JD", "BJD").';
COMMENT ON COLUMN exoplanets.pl_trandur IS 'Transit duration [hours].';
COMMENT ON COLUMN exoplanets.pl_trandurerr1 IS 'Upper (+) uncertainty of: transit duration [hours].';
COMMENT ON COLUMN exoplanets.pl_trandurerr2 IS 'Lower (-) uncertainty of: transit duration [hours]. Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.pl_trandursymerr IS 'Whether the uncertainty of pl_trandur is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.pl_trandurlim IS 'Limit flag for pl_trandur: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.pl_trandurstr IS 'pl_trandur formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.pl_trandurformat IS 'Display format for pl_trandur (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.pl_trandur_solnid IS 'ID of the solution (row in the ps table) that pl_trandur was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.pl_trandur_reflink IS 'Bibliographic reference for pl_trandur as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.pl_trandep IS 'Transit depth: how much the star''s brightness drops [%].';
COMMENT ON COLUMN exoplanets.pl_trandeperr1 IS 'Upper (+) uncertainty of: transit depth: how much the star''s brightness drops [%].';
COMMENT ON COLUMN exoplanets.pl_trandeperr2 IS 'Lower (-) uncertainty of: transit depth: how much the star''s brightness drops [%]. Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.pl_trandepsymerr IS 'Whether the uncertainty of pl_trandep is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.pl_trandeplim IS 'Limit flag for pl_trandep: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.pl_trandepstr IS 'pl_trandep formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.pl_trandepformat IS 'Display format for pl_trandep (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.pl_trandep_solnid IS 'ID of the solution (row in the ps table) that pl_trandep was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.pl_trandep_reflink IS 'Bibliographic reference for pl_trandep as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.pl_occdep IS 'Occultation depth (secondary eclipse, when the planet passes behind the star) [%].';
COMMENT ON COLUMN exoplanets.pl_occdeperr1 IS 'Upper (+) uncertainty of: occultation depth (secondary eclipse, when the planet passes behind the star) [%].';
COMMENT ON COLUMN exoplanets.pl_occdeperr2 IS 'Lower (-) uncertainty of: occultation depth (secondary eclipse, when the planet passes behind the star) [%]. Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.pl_occdepsymerr IS 'Whether the uncertainty of pl_occdep is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.pl_occdeplim IS 'Limit flag for pl_occdep: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.pl_occdepstr IS 'pl_occdep formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.pl_occdepformat IS 'Display format for pl_occdep (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.pl_occdep_solnid IS 'ID of the solution (row in the ps table) that pl_occdep was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.pl_occdep_reflink IS 'Bibliographic reference for pl_occdep as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.pl_ratror IS 'Ratio of planet radius to stellar radius (Rp/R*).';
COMMENT ON COLUMN exoplanets.pl_ratrorerr1 IS 'Upper (+) uncertainty of: ratio of planet radius to stellar radius (Rp/R*).';
COMMENT ON COLUMN exoplanets.pl_ratrorerr2 IS 'Lower (-) uncertainty of: ratio of planet radius to stellar radius (Rp/R*). Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.pl_ratrorsymerr IS 'Whether the uncertainty of pl_ratror is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.pl_ratrorlim IS 'Limit flag for pl_ratror: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.pl_ratrorstr IS 'pl_ratror formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.pl_ratrorformat IS 'Display format for pl_ratror (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.pl_ratror_solnid IS 'ID of the solution (row in the ps table) that pl_ratror was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.pl_ratror_reflink IS 'Bibliographic reference for pl_ratror as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.pl_ratdor IS 'Ratio of planet-star distance to stellar radius (a/R*).';
COMMENT ON COLUMN exoplanets.pl_ratdorerr1 IS 'Upper (+) uncertainty of: ratio of planet-star distance to stellar radius (a/R*).';
COMMENT ON COLUMN exoplanets.pl_ratdorerr2 IS 'Lower (-) uncertainty of: ratio of planet-star distance to stellar radius (a/R*). Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.pl_ratdorsymerr IS 'Whether the uncertainty of pl_ratdor is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.pl_ratdorlim IS 'Limit flag for pl_ratdor: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.pl_ratdorstr IS 'pl_ratdor formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.pl_ratdorformat IS 'Display format for pl_ratdor (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.pl_ratdor_solnid IS 'ID of the solution (row in the ps table) that pl_ratdor was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.pl_ratdor_reflink IS 'Bibliographic reference for pl_ratdor as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.pl_imppar IS 'Impact parameter: how far from the center of the stellar disk the transit passes (0 = through the center).';
COMMENT ON COLUMN exoplanets.pl_impparerr1 IS 'Upper (+) uncertainty of: impact parameter: how far from the center of the stellar disk the transit passes (0 = through the center).';
COMMENT ON COLUMN exoplanets.pl_impparerr2 IS 'Lower (-) uncertainty of: impact parameter: how far from the center of the stellar disk the transit passes (0 = through the center). Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.pl_impparsymerr IS 'Whether the uncertainty of pl_imppar is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.pl_impparlim IS 'Limit flag for pl_imppar: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.pl_impparstr IS 'pl_imppar formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.pl_impparformat IS 'Display format for pl_imppar (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.pl_imppar_solnid IS 'ID of the solution (row in the ps table) that pl_imppar was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.pl_imppar_reflink IS 'Bibliographic reference for pl_imppar as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.pl_projobliq IS 'Projected obliquity: angle between the orbit and the stellar spin axis, projected on the sky [degrees].';
COMMENT ON COLUMN exoplanets.pl_projobliqerr1 IS 'Upper (+) uncertainty of: projected obliquity: angle between the orbit and the stellar spin axis, projected on the sky [degrees].';
COMMENT ON COLUMN exoplanets.pl_projobliqerr2 IS 'Lower (-) uncertainty of: projected obliquity: angle between the orbit and the stellar spin axis, projected on the sky [degrees]. Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.pl_projobliqsymerr IS 'Whether the uncertainty of pl_projobliq is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.pl_projobliqlim IS 'Limit flag for pl_projobliq: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.pl_projobliqstr IS 'pl_projobliq formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.pl_projobliqformat IS 'Display format for pl_projobliq (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.pl_projobliq_solnid IS 'ID of the solution (row in the ps table) that pl_projobliq was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.pl_projobliq_reflink IS 'Bibliographic reference for pl_projobliq as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.pl_trueobliq IS 'True (3D) obliquity between the orbit and the stellar spin axis [degrees].';
COMMENT ON COLUMN exoplanets.pl_trueobliqerr1 IS 'Upper (+) uncertainty of: true (3D) obliquity between the orbit and the stellar spin axis [degrees].';
COMMENT ON COLUMN exoplanets.pl_trueobliqerr2 IS 'Lower (-) uncertainty of: true (3D) obliquity between the orbit and the stellar spin axis [degrees]. Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.pl_trueobliqsymerr IS 'Whether the uncertainty of pl_trueobliq is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.pl_trueobliqlim IS 'Limit flag for pl_trueobliq: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.pl_trueobliqstr IS 'pl_trueobliq formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.pl_trueobliqformat IS 'Display format for pl_trueobliq (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.pl_trueobliq_solnid IS 'ID of the solution (row in the ps table) that pl_trueobliq was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.pl_trueobliq_reflink IS 'Bibliographic reference for pl_trueobliq as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.pl_rade IS 'Planet radius [Earth radii].';
COMMENT ON COLUMN exoplanets.pl_radeerr1 IS 'Upper (+) uncertainty of: planet radius [Earth radii].';
COMMENT ON COLUMN exoplanets.pl_radeerr2 IS 'Lower (-) uncertainty of: planet radius [Earth radii]. Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.pl_radesymerr IS 'Whether the uncertainty of pl_rade is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.pl_radelim IS 'Limit flag for pl_rade: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.pl_radestr IS 'pl_rade formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.pl_radeformat IS 'Display format for pl_rade (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.pl_rade_solnid IS 'ID of the solution (row in the ps table) that pl_rade was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.pl_rade_reflink IS 'Bibliographic reference for pl_rade as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.pl_radj IS 'Planet radius [Jupiter radii].';
COMMENT ON COLUMN exoplanets.pl_radjerr1 IS 'Upper (+) uncertainty of: planet radius [Jupiter radii].';
COMMENT ON COLUMN exoplanets.pl_radjerr2 IS 'Lower (-) uncertainty of: planet radius [Jupiter radii]. Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.pl_radjsymerr IS 'Whether the uncertainty of pl_radj is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.pl_radjlim IS 'Limit flag for pl_radj: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.pl_radjstr IS 'pl_radj formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.pl_radjformat IS 'Display format for pl_radj (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.pl_radj_solnid IS 'ID of the solution (row in the ps table) that pl_radj was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.pl_radj_reflink IS 'Bibliographic reference for pl_radj as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.pl_masse IS 'Planet mass (directly measured) [Earth masses].';
COMMENT ON COLUMN exoplanets.pl_masseerr1 IS 'Upper (+) uncertainty of: planet mass (directly measured) [Earth masses].';
COMMENT ON COLUMN exoplanets.pl_masseerr2 IS 'Lower (-) uncertainty of: planet mass (directly measured) [Earth masses]. Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.pl_massesymerr IS 'Whether the uncertainty of pl_masse is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.pl_masselim IS 'Limit flag for pl_masse: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.pl_massestr IS 'pl_masse formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.pl_masseformat IS 'Display format for pl_masse (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.pl_masse_solnid IS 'ID of the solution (row in the ps table) that pl_masse was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.pl_masse_reflink IS 'Bibliographic reference for pl_masse as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.pl_massj IS 'Planet mass (directly measured) [Jupiter masses].';
COMMENT ON COLUMN exoplanets.pl_massjerr1 IS 'Upper (+) uncertainty of: planet mass (directly measured) [Jupiter masses].';
COMMENT ON COLUMN exoplanets.pl_massjerr2 IS 'Lower (-) uncertainty of: planet mass (directly measured) [Jupiter masses]. Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.pl_massjsymerr IS 'Whether the uncertainty of pl_massj is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.pl_massjlim IS 'Limit flag for pl_massj: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.pl_massjstr IS 'pl_massj formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.pl_massjformat IS 'Display format for pl_massj (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.pl_massj_solnid IS 'ID of the solution (row in the ps table) that pl_massj was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.pl_massj_reflink IS 'Bibliographic reference for pl_massj as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.pl_msinie IS 'Minimum mass M·sin(i), typical of radial velocity when the inclination is unknown [Earth masses].';
COMMENT ON COLUMN exoplanets.pl_msinieerr1 IS 'Upper (+) uncertainty of: minimum mass M·sin(i), typical of radial velocity when the inclination is unknown [Earth masses].';
COMMENT ON COLUMN exoplanets.pl_msinieerr2 IS 'Lower (-) uncertainty of: minimum mass M·sin(i), typical of radial velocity when the inclination is unknown [Earth masses]. Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.pl_msiniesymerr IS 'Whether the uncertainty of pl_msinie is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.pl_msinielim IS 'Limit flag for pl_msinie: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.pl_msiniestr IS 'pl_msinie formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.pl_msinieformat IS 'Display format for pl_msinie (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.pl_msinie_solnid IS 'ID of the solution (row in the ps table) that pl_msinie was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.pl_msinie_reflink IS 'Bibliographic reference for pl_msinie as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.pl_msinij IS 'Minimum mass M·sin(i), typical of radial velocity when the inclination is unknown [Jupiter masses].';
COMMENT ON COLUMN exoplanets.pl_msinijerr1 IS 'Upper (+) uncertainty of: minimum mass M·sin(i), typical of radial velocity when the inclination is unknown [Jupiter masses].';
COMMENT ON COLUMN exoplanets.pl_msinijerr2 IS 'Lower (-) uncertainty of: minimum mass M·sin(i), typical of radial velocity when the inclination is unknown [Jupiter masses]. Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.pl_msinijsymerr IS 'Whether the uncertainty of pl_msinij is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.pl_msinijlim IS 'Limit flag for pl_msinij: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.pl_msinijstr IS 'pl_msinij formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.pl_msinijformat IS 'Display format for pl_msinij (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.pl_msinij_solnid IS 'ID of the solution (row in the ps table) that pl_msinij was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.pl_msinij_reflink IS 'Bibliographic reference for pl_msinij as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.pl_cmasse IS 'Mass obtained by dividing M·sin(i) by sin(i) using a known inclination [Earth masses].';
COMMENT ON COLUMN exoplanets.pl_cmasseerr1 IS 'Upper (+) uncertainty of: mass obtained by dividing M·sin(i) by sin(i) using a known inclination [Earth masses].';
COMMENT ON COLUMN exoplanets.pl_cmasseerr2 IS 'Lower (-) uncertainty of: mass obtained by dividing M·sin(i) by sin(i) using a known inclination [Earth masses]. Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.pl_cmassesymerr IS 'Whether the uncertainty of pl_cmasse is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.pl_cmasselim IS 'Limit flag for pl_cmasse: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.pl_cmassestr IS 'pl_cmasse formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.pl_cmasseformat IS 'Display format for pl_cmasse (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.pl_cmasse_solnid IS 'ID of the solution (row in the ps table) that pl_cmasse was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.pl_cmasse_reflink IS 'Bibliographic reference for pl_cmasse as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.pl_cmassj IS 'Mass obtained by dividing M·sin(i) by sin(i) using a known inclination [Jupiter masses].';
COMMENT ON COLUMN exoplanets.pl_cmassjerr1 IS 'Upper (+) uncertainty of: mass obtained by dividing M·sin(i) by sin(i) using a known inclination [Jupiter masses].';
COMMENT ON COLUMN exoplanets.pl_cmassjerr2 IS 'Lower (-) uncertainty of: mass obtained by dividing M·sin(i) by sin(i) using a known inclination [Jupiter masses]. Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.pl_cmassjsymerr IS 'Whether the uncertainty of pl_cmassj is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.pl_cmassjlim IS 'Limit flag for pl_cmassj: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.pl_cmassjstr IS 'pl_cmassj formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.pl_cmassjformat IS 'Display format for pl_cmassj (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.pl_cmassj_solnid IS 'ID of the solution (row in the ps table) that pl_cmassj was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.pl_cmassj_reflink IS 'Bibliographic reference for pl_cmassj as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.pl_bmasse IS 'Best available mass estimate (may be true mass or M·sin(i); see pl_bmassprov) [Earth masses]. This is the most complete mass field: use it if you want a value for as many planets as possible.';
COMMENT ON COLUMN exoplanets.pl_bmasseerr1 IS 'Upper (+) uncertainty of: best available mass estimate (may be true mass or M·sin(i); see pl_bmassprov) [Earth masses].';
COMMENT ON COLUMN exoplanets.pl_bmasseerr2 IS 'Lower (-) uncertainty of: best available mass estimate (may be true mass or M·sin(i); see pl_bmassprov) [Earth masses]. Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.pl_bmassesymerr IS 'Whether the uncertainty of pl_bmasse is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.pl_bmasselim IS 'Limit flag for pl_bmasse: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.pl_bmassestr IS 'pl_bmasse formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.pl_bmasseformat IS 'Display format for pl_bmasse (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.pl_bmasse_solnid IS 'ID of the solution (row in the ps table) that pl_bmasse was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.pl_bmasse_reflink IS 'Bibliographic reference for pl_bmasse as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.pl_bmassj IS 'Best available mass estimate (see pl_bmassprov) [Jupiter masses].';
COMMENT ON COLUMN exoplanets.pl_bmassjerr1 IS 'Upper (+) uncertainty of: best available mass estimate (see pl_bmassprov) [Jupiter masses].';
COMMENT ON COLUMN exoplanets.pl_bmassjerr2 IS 'Lower (-) uncertainty of: best available mass estimate (see pl_bmassprov) [Jupiter masses]. Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.pl_bmassjsymerr IS 'Whether the uncertainty of pl_bmassj is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.pl_bmassjlim IS 'Limit flag for pl_bmassj: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.pl_bmassjstr IS 'pl_bmassj formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.pl_bmassjformat IS 'Display format for pl_bmassj (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.pl_bmassj_solnid IS 'ID of the solution (row in the ps table) that pl_bmassj was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.pl_bmassj_reflink IS 'Bibliographic reference for pl_bmassj as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.pl_bmassprov IS 'Where the "best mass" comes from: true mass ("Mass"), minimum mass ("Msini") or corrected ("Msin(i)/sin(i)").';
COMMENT ON COLUMN exoplanets.pl_dens IS 'Planet density [g/cm³].';
COMMENT ON COLUMN exoplanets.pl_denserr1 IS 'Upper (+) uncertainty of: planet density [g/cm³].';
COMMENT ON COLUMN exoplanets.pl_denserr2 IS 'Lower (-) uncertainty of: planet density [g/cm³]. Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.pl_denssymerr IS 'Whether the uncertainty of pl_dens is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.pl_denslim IS 'Limit flag for pl_dens: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.pl_densstr IS 'pl_dens formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.pl_densformat IS 'Display format for pl_dens (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.pl_dens_solnid IS 'ID of the solution (row in the ps table) that pl_dens was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.pl_dens_reflink IS 'Bibliographic reference for pl_dens as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.pl_eqt IS 'Equilibrium temperature (estimated temperature assuming a blackbody heated by its star) [K].';
COMMENT ON COLUMN exoplanets.pl_eqterr1 IS 'Upper (+) uncertainty of: equilibrium temperature (estimated temperature assuming a blackbody heated by its star) [K].';
COMMENT ON COLUMN exoplanets.pl_eqterr2 IS 'Lower (-) uncertainty of: equilibrium temperature (estimated temperature assuming a blackbody heated by its star) [K]. Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.pl_eqtsymerr IS 'Whether the uncertainty of pl_eqt is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.pl_eqtlim IS 'Limit flag for pl_eqt: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.pl_eqtstr IS 'pl_eqt formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.pl_eqtformat IS 'Display format for pl_eqt (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.pl_eqt_solnid IS 'ID of the solution (row in the ps table) that pl_eqt was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.pl_eqt_reflink IS 'Bibliographic reference for pl_eqt as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.pl_insol IS 'Insolation flux: energy received from its star [times the flux received by Earth].';
COMMENT ON COLUMN exoplanets.pl_insolerr1 IS 'Upper (+) uncertainty of: insolation flux: energy received from its star [times the flux received by Earth].';
COMMENT ON COLUMN exoplanets.pl_insolerr2 IS 'Lower (-) uncertainty of: insolation flux: energy received from its star [times the flux received by Earth]. Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.pl_insolsymerr IS 'Whether the uncertainty of pl_insol is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.pl_insollim IS 'Limit flag for pl_insol: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.pl_insolstr IS 'pl_insol formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.pl_insolformat IS 'Display format for pl_insol (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.pl_insol_solnid IS 'ID of the solution (row in the ps table) that pl_insol was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.pl_insol_reflink IS 'Bibliographic reference for pl_insol as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.pl_rvamp IS 'Radial velocity semi-amplitude: how much the star "wobbles" due to the planet''s pull [m/s].';
COMMENT ON COLUMN exoplanets.pl_rvamperr1 IS 'Upper (+) uncertainty of: radial velocity semi-amplitude: how much the star "wobbles" due to the planet''s pull [m/s].';
COMMENT ON COLUMN exoplanets.pl_rvamperr2 IS 'Lower (-) uncertainty of: radial velocity semi-amplitude: how much the star "wobbles" due to the planet''s pull [m/s]. Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.pl_rvampsymerr IS 'Whether the uncertainty of pl_rvamp is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.pl_rvamplim IS 'Limit flag for pl_rvamp: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.pl_rvampstr IS 'pl_rvamp formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.pl_rvampformat IS 'Display format for pl_rvamp (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.pl_rvamp_solnid IS 'ID of the solution (row in the ps table) that pl_rvamp was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.pl_rvamp_reflink IS 'Bibliographic reference for pl_rvamp as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.pl_tsm IS 'TSM (Transmission Spectroscopy Metric): how good a target it is for transmission spectroscopy.';
COMMENT ON COLUMN exoplanets.pl_tsmerr1 IS 'Upper (+) uncertainty of: tSM (Transmission Spectroscopy Metric): how good a target it is for transmission spectroscopy.';
COMMENT ON COLUMN exoplanets.pl_tsmerr2 IS 'Lower (-) uncertainty of: tSM (Transmission Spectroscopy Metric): how good a target it is for transmission spectroscopy. Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.pl_tsmlim IS 'Limit flag for pl_tsm: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.pl_tsmstr IS 'pl_tsm formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;. Note: like pl_esmstr, the API may return this one as a number.';
COMMENT ON COLUMN exoplanets.pl_tsm_solnid IS 'ID of the solution (row in the ps table) that pl_tsm was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.pl_tsm_reflink IS 'Bibliographic reference for pl_tsm as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.pl_esm IS 'ESM (Emission Spectroscopy Metric): how good a target it is for emission spectroscopy.';
COMMENT ON COLUMN exoplanets.pl_esmerr1 IS 'Upper (+) uncertainty of: eSM (Emission Spectroscopy Metric): how good a target it is for emission spectroscopy.';
COMMENT ON COLUMN exoplanets.pl_esmerr2 IS 'Lower (-) uncertainty of: eSM (Emission Spectroscopy Metric): how good a target it is for emission spectroscopy. Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.pl_esmlim IS 'Limit flag for pl_esm: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.pl_esmstr IS 'pl_esm formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;. Note: unlike most *str fields (but like pl_tsmstr), the API may return this one as a number.';
COMMENT ON COLUMN exoplanets.pl_esm_solnid IS 'ID of the solution (row in the ps table) that pl_esm was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.pl_esm_reflink IS 'Bibliographic reference for pl_esm as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.st_spectype IS 'Spectral type of the star (e.g. "G8 V").';
COMMENT ON COLUMN exoplanets.st_spectype_solnid IS 'ID of the solution (row in the ps table) that st_spectype was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.st_spectype_reflink IS 'Bibliographic reference for st_spectype as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.st_teff IS 'Effective temperature of the stellar surface [K].';
COMMENT ON COLUMN exoplanets.st_tefferr1 IS 'Upper (+) uncertainty of: effective temperature of the stellar surface [K].';
COMMENT ON COLUMN exoplanets.st_tefferr2 IS 'Lower (-) uncertainty of: effective temperature of the stellar surface [K]. Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.st_teffsymerr IS 'Whether the uncertainty of st_teff is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.st_tefflim IS 'Limit flag for st_teff: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.st_teffstr IS 'st_teff formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.st_teffformat IS 'Display format for st_teff (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.st_teff_solnid IS 'ID of the solution (row in the ps table) that st_teff was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.st_teff_reflink IS 'Bibliographic reference for st_teff as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.st_rad IS 'Stellar radius [solar radii].';
COMMENT ON COLUMN exoplanets.st_raderr1 IS 'Upper (+) uncertainty of: stellar radius [solar radii].';
COMMENT ON COLUMN exoplanets.st_raderr2 IS 'Lower (-) uncertainty of: stellar radius [solar radii]. Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.st_radsymerr IS 'Whether the uncertainty of st_rad is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.st_radlim IS 'Limit flag for st_rad: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.st_radstr IS 'st_rad formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.st_radformat IS 'Display format for st_rad (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.st_rad_solnid IS 'ID of the solution (row in the ps table) that st_rad was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.st_rad_reflink IS 'Bibliographic reference for st_rad as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.st_mass IS 'Stellar mass [solar masses].';
COMMENT ON COLUMN exoplanets.st_masserr1 IS 'Upper (+) uncertainty of: stellar mass [solar masses].';
COMMENT ON COLUMN exoplanets.st_masserr2 IS 'Lower (-) uncertainty of: stellar mass [solar masses]. Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.st_masssymerr IS 'Whether the uncertainty of st_mass is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.st_masslim IS 'Limit flag for st_mass: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.st_massstr IS 'st_mass formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.st_massformat IS 'Display format for st_mass (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.st_mass_solnid IS 'ID of the solution (row in the ps table) that st_mass was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.st_mass_reflink IS 'Bibliographic reference for st_mass as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.st_dens IS 'Stellar density [g/cm³].';
COMMENT ON COLUMN exoplanets.st_denserr1 IS 'Upper (+) uncertainty of: stellar density [g/cm³].';
COMMENT ON COLUMN exoplanets.st_denserr2 IS 'Lower (-) uncertainty of: stellar density [g/cm³]. Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.st_denssymerr IS 'Whether the uncertainty of st_dens is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.st_denslim IS 'Limit flag for st_dens: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.st_densstr IS 'st_dens formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.st_densformat IS 'Display format for st_dens (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.st_dens_solnid IS 'ID of the solution (row in the ps table) that st_dens was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.st_dens_reflink IS 'Bibliographic reference for st_dens as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.st_lum IS 'Stellar luminosity on a logarithmic scale [log10(L☉)].';
COMMENT ON COLUMN exoplanets.st_lumerr1 IS 'Upper (+) uncertainty of: stellar luminosity on a logarithmic scale [log10(L☉)].';
COMMENT ON COLUMN exoplanets.st_lumerr2 IS 'Lower (-) uncertainty of: stellar luminosity on a logarithmic scale [log10(L☉)]. Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.st_lumsymerr IS 'Whether the uncertainty of st_lum is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.st_lumlim IS 'Limit flag for st_lum: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.st_lumstr IS 'st_lum formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.st_lumformat IS 'Display format for st_lum (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.st_lum_solnid IS 'ID of the solution (row in the ps table) that st_lum was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.st_lum_reflink IS 'Bibliographic reference for st_lum as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.st_logg IS 'Stellar surface gravity [log10(cm/s²)].';
COMMENT ON COLUMN exoplanets.st_loggerr1 IS 'Upper (+) uncertainty of: stellar surface gravity [log10(cm/s²)].';
COMMENT ON COLUMN exoplanets.st_loggerr2 IS 'Lower (-) uncertainty of: stellar surface gravity [log10(cm/s²)]. Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.st_loggsymerr IS 'Whether the uncertainty of st_logg is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.st_logglim IS 'Limit flag for st_logg: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.st_loggstr IS 'st_logg formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.st_loggformat IS 'Display format for st_logg (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.st_logg_solnid IS 'ID of the solution (row in the ps table) that st_logg was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.st_logg_reflink IS 'Bibliographic reference for st_logg as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.st_age IS 'Stellar age [Gyr, billions of years].';
COMMENT ON COLUMN exoplanets.st_ageerr1 IS 'Upper (+) uncertainty of: stellar age [Gyr, billions of years].';
COMMENT ON COLUMN exoplanets.st_ageerr2 IS 'Lower (-) uncertainty of: stellar age [Gyr, billions of years]. Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.st_agesymerr IS 'Whether the uncertainty of st_age is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.st_agelim IS 'Limit flag for st_age: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.st_agestr IS 'st_age formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.st_ageformat IS 'Display format for st_age (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.st_age_solnid IS 'ID of the solution (row in the ps table) that st_age was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.st_age_reflink IS 'Bibliographic reference for st_age as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.st_met IS 'Metallicity: abundance of elements heavier than helium relative to the Sun [dex].';
COMMENT ON COLUMN exoplanets.st_meterr1 IS 'Upper (+) uncertainty of: metallicity: abundance of elements heavier than helium relative to the Sun [dex].';
COMMENT ON COLUMN exoplanets.st_meterr2 IS 'Lower (-) uncertainty of: metallicity: abundance of elements heavier than helium relative to the Sun [dex]. Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.st_metsymerr IS 'Whether the uncertainty of st_met is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.st_metlim IS 'Limit flag for st_met: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.st_metstr IS 'st_met formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.st_metformat IS 'Display format for st_met (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.st_met_solnid IS 'ID of the solution (row in the ps table) that st_met was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.st_met_reflink IS 'Bibliographic reference for st_met as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.st_metratio IS 'Ratio used to express the metallicity (e.g. "[Fe/H]" or "[M/H]").';
COMMENT ON COLUMN exoplanets.st_metn IS 'Metallicity expressed as an alternative value (almost always null in practice).';
COMMENT ON COLUMN exoplanets.st_log_rhk IS 'Chromospheric activity index log R''HK (more negative = less active star).';
COMMENT ON COLUMN exoplanets.st_log_rhkerr1 IS 'Upper (+) uncertainty of: chromospheric activity index log R''HK (more negative = less active star).';
COMMENT ON COLUMN exoplanets.st_log_rhkerr2 IS 'Lower (-) uncertainty of: chromospheric activity index log R''HK (more negative = less active star). Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.st_log_rhksymerr IS 'Whether the uncertainty of st_log_rhk is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.st_log_rhklim IS 'Limit flag for st_log_rhk: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.st_log_rhkstr IS 'st_log_rhk formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.st_log_rhkformat IS 'Display format for st_log_rhk (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.st_log_rhk_solnid IS 'ID of the solution (row in the ps table) that st_log_rhk was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.st_log_rhk_reflink IS 'Bibliographic reference for st_log_rhk as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.st_vsin IS 'Projected rotational velocity v·sin(i) [km/s].';
COMMENT ON COLUMN exoplanets.st_vsinerr1 IS 'Upper (+) uncertainty of: projected rotational velocity v·sin(i) [km/s].';
COMMENT ON COLUMN exoplanets.st_vsinerr2 IS 'Lower (-) uncertainty of: projected rotational velocity v·sin(i) [km/s]. Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.st_vsinsymerr IS 'Whether the uncertainty of st_vsin is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.st_vsinlim IS 'Limit flag for st_vsin: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.st_vsinstr IS 'st_vsin formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.st_vsinformat IS 'Display format for st_vsin (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.st_vsin_solnid IS 'ID of the solution (row in the ps table) that st_vsin was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.st_vsin_reflink IS 'Bibliographic reference for st_vsin as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.st_rotp IS 'Stellar rotation period [days].';
COMMENT ON COLUMN exoplanets.st_rotperr1 IS 'Upper (+) uncertainty of: stellar rotation period [days].';
COMMENT ON COLUMN exoplanets.st_rotperr2 IS 'Lower (-) uncertainty of: stellar rotation period [days]. Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.st_rotpsymerr IS 'Whether the uncertainty of st_rotp is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.st_rotplim IS 'Limit flag for st_rotp: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.st_rotpstr IS 'st_rotp formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.st_rotpformat IS 'Display format for st_rotp (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.st_rotp_solnid IS 'ID of the solution (row in the ps table) that st_rotp was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.st_rotp_reflink IS 'Bibliographic reference for st_rotp as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.st_radv IS 'Systemic radial velocity: speed at which the system approaches (-) or recedes (+) from us [km/s].';
COMMENT ON COLUMN exoplanets.st_radverr1 IS 'Upper (+) uncertainty of: systemic radial velocity: speed at which the system approaches (-) or recedes (+) from us [km/s].';
COMMENT ON COLUMN exoplanets.st_radverr2 IS 'Lower (-) uncertainty of: systemic radial velocity: speed at which the system approaches (-) or recedes (+) from us [km/s]. Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.st_radvsymerr IS 'Whether the uncertainty of st_radv is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.st_radvlim IS 'Limit flag for st_radv: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.st_radvstr IS 'st_radv formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.st_radvformat IS 'Display format for st_radv (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.st_radv_solnid IS 'ID of the solution (row in the ps table) that st_radv was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.st_radv_reflink IS 'Bibliographic reference for st_radv as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.sy_dist IS 'Distance to the system [pc, parsecs (1 pc ≈ 3.26 light-years)].';
COMMENT ON COLUMN exoplanets.sy_disterr1 IS 'Upper (+) uncertainty of: distance to the system [pc, parsecs (1 pc ≈ 3.26 light-years)].';
COMMENT ON COLUMN exoplanets.sy_disterr2 IS 'Lower (-) uncertainty of: distance to the system [pc, parsecs (1 pc ≈ 3.26 light-years)]. Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.sy_distsymerr IS 'Whether the uncertainty of sy_dist is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.sy_distlim IS 'Limit flag for sy_dist: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.sy_diststr IS 'sy_dist formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.sy_distformat IS 'Display format for sy_dist (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.sy_dist_solnid IS 'ID of the solution (row in the ps table) that sy_dist was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.sy_dist_reflink IS 'Bibliographic reference for sy_dist as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.sy_plx IS 'Parallax [mas, milliarcseconds].';
COMMENT ON COLUMN exoplanets.sy_plxerr1 IS 'Upper (+) uncertainty of: parallax [mas, milliarcseconds].';
COMMENT ON COLUMN exoplanets.sy_plxerr2 IS 'Lower (-) uncertainty of: parallax [mas, milliarcseconds]. Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.sy_plxsymerr IS 'Whether the uncertainty of sy_plx is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.sy_plxlim IS 'Limit flag for sy_plx: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.sy_plxstr IS 'sy_plx formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.sy_plxformat IS 'Display format for sy_plx (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.sy_plx_solnid IS 'ID of the solution (row in the ps table) that sy_plx was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.sy_plx_reflink IS 'Bibliographic reference for sy_plx as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.sy_pm IS 'Total proper motion on the sky [mas/yr].';
COMMENT ON COLUMN exoplanets.sy_pmerr1 IS 'Upper (+) uncertainty of: total proper motion on the sky [mas/yr].';
COMMENT ON COLUMN exoplanets.sy_pmerr2 IS 'Lower (-) uncertainty of: total proper motion on the sky [mas/yr]. Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.sy_pmsymerr IS 'Whether the uncertainty of sy_pm is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.sy_pmlim IS 'Limit flag for sy_pm: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.sy_pmstr IS 'sy_pm formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.sy_pmformat IS 'Display format for sy_pm (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.sy_pm_solnid IS 'ID of the solution (row in the ps table) that sy_pm was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.sy_pm_reflink IS 'Bibliographic reference for sy_pm as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.sy_pmra IS 'Proper motion in right ascension [mas/yr].';
COMMENT ON COLUMN exoplanets.sy_pmraerr1 IS 'Upper (+) uncertainty of: proper motion in right ascension [mas/yr].';
COMMENT ON COLUMN exoplanets.sy_pmraerr2 IS 'Lower (-) uncertainty of: proper motion in right ascension [mas/yr]. Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.sy_pmrasymerr IS 'Whether the uncertainty of sy_pmra is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.sy_pmralim IS 'Limit flag for sy_pmra: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.sy_pmrastr IS 'sy_pmra formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.sy_pmraformat IS 'Display format for sy_pmra (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.sy_pmra_solnid IS 'ID of the solution (row in the ps table) that sy_pmra was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.sy_pmra_reflink IS 'Bibliographic reference for sy_pmra as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.sy_pmdec IS 'Proper motion in declination [mas/yr].';
COMMENT ON COLUMN exoplanets.sy_pmdecerr1 IS 'Upper (+) uncertainty of: proper motion in declination [mas/yr].';
COMMENT ON COLUMN exoplanets.sy_pmdecerr2 IS 'Lower (-) uncertainty of: proper motion in declination [mas/yr]. Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.sy_pmdecsymerr IS 'Whether the uncertainty of sy_pmdec is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.sy_pmdeclim IS 'Limit flag for sy_pmdec: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.sy_pmdecstr IS 'sy_pmdec formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.sy_pmdecformat IS 'Display format for sy_pmdec (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.sy_pmdec_solnid IS 'ID of the solution (row in the ps table) that sy_pmdec was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.sy_pmdec_reflink IS 'Bibliographic reference for sy_pmdec as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.sy_bmag IS 'B magnitude (Johnson).';
COMMENT ON COLUMN exoplanets.sy_bmagerr1 IS 'Upper (+) uncertainty of: b magnitude (Johnson).';
COMMENT ON COLUMN exoplanets.sy_bmagerr2 IS 'Lower (-) uncertainty of: b magnitude (Johnson). Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.sy_bmagsymerr IS 'Whether the uncertainty of sy_bmag is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.sy_bmaglim IS 'Limit flag for sy_bmag: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.sy_bmagstr IS 'sy_bmag formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.sy_bmagformat IS 'Display format for sy_bmag (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.sy_bmag_solnid IS 'ID of the solution (row in the ps table) that sy_bmag was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.sy_bmag_reflink IS 'Bibliographic reference for sy_bmag as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.sy_vmag IS 'V magnitude (Johnson, visible).';
COMMENT ON COLUMN exoplanets.sy_vmagerr1 IS 'Upper (+) uncertainty of: v magnitude (Johnson, visible).';
COMMENT ON COLUMN exoplanets.sy_vmagerr2 IS 'Lower (-) uncertainty of: v magnitude (Johnson, visible). Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.sy_vmagsymerr IS 'Whether the uncertainty of sy_vmag is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.sy_vmaglim IS 'Limit flag for sy_vmag: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.sy_vmagstr IS 'sy_vmag formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.sy_vmagformat IS 'Display format for sy_vmag (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.sy_vmag_solnid IS 'ID of the solution (row in the ps table) that sy_vmag was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.sy_vmag_reflink IS 'Bibliographic reference for sy_vmag as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.sy_umag IS 'u magnitude (Sloan).';
COMMENT ON COLUMN exoplanets.sy_umagerr1 IS 'Upper (+) uncertainty of: u magnitude (Sloan).';
COMMENT ON COLUMN exoplanets.sy_umagerr2 IS 'Lower (-) uncertainty of: u magnitude (Sloan). Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.sy_umagsymerr IS 'Whether the uncertainty of sy_umag is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.sy_umaglim IS 'Limit flag for sy_umag: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.sy_umagstr IS 'sy_umag formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.sy_umagformat IS 'Display format for sy_umag (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.sy_umag_solnid IS 'ID of the solution (row in the ps table) that sy_umag was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.sy_umag_reflink IS 'Bibliographic reference for sy_umag as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.sy_gmag IS 'g magnitude (Sloan).';
COMMENT ON COLUMN exoplanets.sy_gmagerr1 IS 'Upper (+) uncertainty of: g magnitude (Sloan).';
COMMENT ON COLUMN exoplanets.sy_gmagerr2 IS 'Lower (-) uncertainty of: g magnitude (Sloan). Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.sy_gmagsymerr IS 'Whether the uncertainty of sy_gmag is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.sy_gmaglim IS 'Limit flag for sy_gmag: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.sy_gmagstr IS 'sy_gmag formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.sy_gmagformat IS 'Display format for sy_gmag (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.sy_gmag_solnid IS 'ID of the solution (row in the ps table) that sy_gmag was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.sy_gmag_reflink IS 'Bibliographic reference for sy_gmag as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.sy_rmag IS 'r magnitude (Sloan).';
COMMENT ON COLUMN exoplanets.sy_rmagerr1 IS 'Upper (+) uncertainty of: r magnitude (Sloan).';
COMMENT ON COLUMN exoplanets.sy_rmagerr2 IS 'Lower (-) uncertainty of: r magnitude (Sloan). Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.sy_rmagsymerr IS 'Whether the uncertainty of sy_rmag is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.sy_rmaglim IS 'Limit flag for sy_rmag: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.sy_rmagstr IS 'sy_rmag formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.sy_rmagformat IS 'Display format for sy_rmag (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.sy_rmag_solnid IS 'ID of the solution (row in the ps table) that sy_rmag was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.sy_rmag_reflink IS 'Bibliographic reference for sy_rmag as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.sy_imag IS 'i magnitude (Sloan).';
COMMENT ON COLUMN exoplanets.sy_imagerr1 IS 'Upper (+) uncertainty of: i magnitude (Sloan).';
COMMENT ON COLUMN exoplanets.sy_imagerr2 IS 'Lower (-) uncertainty of: i magnitude (Sloan). Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.sy_imagsymerr IS 'Whether the uncertainty of sy_imag is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.sy_imaglim IS 'Limit flag for sy_imag: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.sy_imagstr IS 'sy_imag formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.sy_imagformat IS 'Display format for sy_imag (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.sy_imag_solnid IS 'ID of the solution (row in the ps table) that sy_imag was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.sy_imag_reflink IS 'Bibliographic reference for sy_imag as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.sy_zmag IS 'z magnitude (Sloan).';
COMMENT ON COLUMN exoplanets.sy_zmagerr1 IS 'Upper (+) uncertainty of: z magnitude (Sloan).';
COMMENT ON COLUMN exoplanets.sy_zmagerr2 IS 'Lower (-) uncertainty of: z magnitude (Sloan). Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.sy_zmagsymerr IS 'Whether the uncertainty of sy_zmag is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.sy_zmaglim IS 'Limit flag for sy_zmag: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.sy_zmagstr IS 'sy_zmag formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.sy_zmagformat IS 'Display format for sy_zmag (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.sy_zmag_solnid IS 'ID of the solution (row in the ps table) that sy_zmag was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.sy_zmag_reflink IS 'Bibliographic reference for sy_zmag as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.sy_icmag IS 'I magnitude (Cousins).';
COMMENT ON COLUMN exoplanets.sy_icmagerr1 IS 'Upper (+) uncertainty of: i magnitude (Cousins).';
COMMENT ON COLUMN exoplanets.sy_icmagerr2 IS 'Lower (-) uncertainty of: i magnitude (Cousins). Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.sy_icmagsymerr IS 'Whether the uncertainty of sy_icmag is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.sy_icmaglim IS 'Limit flag for sy_icmag: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.sy_icmagstr IS 'sy_icmag formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.sy_icmagformat IS 'Display format for sy_icmag (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.sy_icmag_solnid IS 'ID of the solution (row in the ps table) that sy_icmag was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.sy_icmag_reflink IS 'Bibliographic reference for sy_icmag as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.sy_jmag IS 'J magnitude (2MASS, near infrared).';
COMMENT ON COLUMN exoplanets.sy_jmagerr1 IS 'Upper (+) uncertainty of: j magnitude (2MASS, near infrared).';
COMMENT ON COLUMN exoplanets.sy_jmagerr2 IS 'Lower (-) uncertainty of: j magnitude (2MASS, near infrared). Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.sy_jmagsymerr IS 'Whether the uncertainty of sy_jmag is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.sy_jmaglim IS 'Limit flag for sy_jmag: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.sy_jmagstr IS 'sy_jmag formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.sy_jmagformat IS 'Display format for sy_jmag (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.sy_jmag_solnid IS 'ID of the solution (row in the ps table) that sy_jmag was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.sy_jmag_reflink IS 'Bibliographic reference for sy_jmag as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.sy_hmag IS 'H magnitude (2MASS).';
COMMENT ON COLUMN exoplanets.sy_hmagerr1 IS 'Upper (+) uncertainty of: h magnitude (2MASS).';
COMMENT ON COLUMN exoplanets.sy_hmagerr2 IS 'Lower (-) uncertainty of: h magnitude (2MASS). Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.sy_hmagsymerr IS 'Whether the uncertainty of sy_hmag is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.sy_hmaglim IS 'Limit flag for sy_hmag: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.sy_hmagstr IS 'sy_hmag formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.sy_hmagformat IS 'Display format for sy_hmag (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.sy_hmag_solnid IS 'ID of the solution (row in the ps table) that sy_hmag was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.sy_hmag_reflink IS 'Bibliographic reference for sy_hmag as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.sy_kmag IS 'Ks magnitude (2MASS).';
COMMENT ON COLUMN exoplanets.sy_kmagerr1 IS 'Upper (+) uncertainty of: ks magnitude (2MASS).';
COMMENT ON COLUMN exoplanets.sy_kmagerr2 IS 'Lower (-) uncertainty of: ks magnitude (2MASS). Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.sy_kmagsymerr IS 'Whether the uncertainty of sy_kmag is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.sy_kmaglim IS 'Limit flag for sy_kmag: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.sy_kmagstr IS 'sy_kmag formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.sy_kmagformat IS 'Display format for sy_kmag (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.sy_kmag_solnid IS 'ID of the solution (row in the ps table) that sy_kmag was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.sy_kmag_reflink IS 'Bibliographic reference for sy_kmag as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.sy_w1mag IS 'W1 magnitude (WISE, 3.4 µm).';
COMMENT ON COLUMN exoplanets.sy_w1magerr1 IS 'Upper (+) uncertainty of: w1 magnitude (WISE, 3.4 µm).';
COMMENT ON COLUMN exoplanets.sy_w1magerr2 IS 'Lower (-) uncertainty of: w1 magnitude (WISE, 3.4 µm). Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.sy_w1magsymerr IS 'Whether the uncertainty of sy_w1mag is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.sy_w1maglim IS 'Limit flag for sy_w1mag: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.sy_w1magstr IS 'sy_w1mag formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.sy_w1magformat IS 'Display format for sy_w1mag (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.sy_w1mag_solnid IS 'ID of the solution (row in the ps table) that sy_w1mag was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.sy_w1mag_reflink IS 'Bibliographic reference for sy_w1mag as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.sy_w2mag IS 'W2 magnitude (WISE, 4.6 µm).';
COMMENT ON COLUMN exoplanets.sy_w2magerr1 IS 'Upper (+) uncertainty of: w2 magnitude (WISE, 4.6 µm).';
COMMENT ON COLUMN exoplanets.sy_w2magerr2 IS 'Lower (-) uncertainty of: w2 magnitude (WISE, 4.6 µm). Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.sy_w2magsymerr IS 'Whether the uncertainty of sy_w2mag is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.sy_w2maglim IS 'Limit flag for sy_w2mag: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.sy_w2magstr IS 'sy_w2mag formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.sy_w2magformat IS 'Display format for sy_w2mag (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.sy_w2mag_solnid IS 'ID of the solution (row in the ps table) that sy_w2mag was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.sy_w2mag_reflink IS 'Bibliographic reference for sy_w2mag as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.sy_w3mag IS 'W3 magnitude (WISE, 12 µm).';
COMMENT ON COLUMN exoplanets.sy_w3magerr1 IS 'Upper (+) uncertainty of: w3 magnitude (WISE, 12 µm).';
COMMENT ON COLUMN exoplanets.sy_w3magerr2 IS 'Lower (-) uncertainty of: w3 magnitude (WISE, 12 µm). Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.sy_w3magsymerr IS 'Whether the uncertainty of sy_w3mag is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.sy_w3maglim IS 'Limit flag for sy_w3mag: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.sy_w3magstr IS 'sy_w3mag formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.sy_w3magformat IS 'Display format for sy_w3mag (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.sy_w3mag_solnid IS 'ID of the solution (row in the ps table) that sy_w3mag was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.sy_w3mag_reflink IS 'Bibliographic reference for sy_w3mag as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.sy_w4mag IS 'W4 magnitude (WISE, 22 µm).';
COMMENT ON COLUMN exoplanets.sy_w4magerr1 IS 'Upper (+) uncertainty of: w4 magnitude (WISE, 22 µm).';
COMMENT ON COLUMN exoplanets.sy_w4magerr2 IS 'Lower (-) uncertainty of: w4 magnitude (WISE, 22 µm). Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.sy_w4magsymerr IS 'Whether the uncertainty of sy_w4mag is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.sy_w4maglim IS 'Limit flag for sy_w4mag: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.sy_w4magstr IS 'sy_w4mag formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.sy_w4magformat IS 'Display format for sy_w4mag (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.sy_w4mag_solnid IS 'ID of the solution (row in the ps table) that sy_w4mag was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.sy_w4mag_reflink IS 'Bibliographic reference for sy_w4mag as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.sy_gaiamag IS 'Gaia G magnitude.';
COMMENT ON COLUMN exoplanets.sy_gaiamagerr1 IS 'Upper (+) uncertainty of: gaia G magnitude.';
COMMENT ON COLUMN exoplanets.sy_gaiamagerr2 IS 'Lower (-) uncertainty of: gaia G magnitude. Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.sy_gaiamagsymerr IS 'Whether the uncertainty of sy_gaiamag is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.sy_gaiamaglim IS 'Limit flag for sy_gaiamag: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.sy_gaiamagstr IS 'sy_gaiamag formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.sy_gaiamagformat IS 'Display format for sy_gaiamag (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.sy_gaiamag_solnid IS 'ID of the solution (row in the ps table) that sy_gaiamag was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.sy_gaiamag_reflink IS 'Bibliographic reference for sy_gaiamag as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.sy_tmag IS 'TESS band magnitude.';
COMMENT ON COLUMN exoplanets.sy_tmagerr1 IS 'Upper (+) uncertainty of: tESS band magnitude.';
COMMENT ON COLUMN exoplanets.sy_tmagerr2 IS 'Lower (-) uncertainty of: tESS band magnitude. Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.sy_tmagsymerr IS 'Whether the uncertainty of sy_tmag is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.sy_tmaglim IS 'Limit flag for sy_tmag: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.sy_tmagstr IS 'sy_tmag formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.sy_tmagformat IS 'Display format for sy_tmag (internal archive use; almost always null).';
COMMENT ON COLUMN exoplanets.sy_tmag_solnid IS 'ID of the solution (row in the ps table) that sy_tmag was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.sy_tmag_reflink IS 'Bibliographic reference for sy_tmag as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
COMMENT ON COLUMN exoplanets.sy_kepmag IS 'Kepler band magnitude.';
COMMENT ON COLUMN exoplanets.sy_kepmagerr1 IS 'Upper (+) uncertainty of: kepler band magnitude.';
COMMENT ON COLUMN exoplanets.sy_kepmagerr2 IS 'Lower (-) uncertainty of: kepler band magnitude. Expressed as a negative value.';
COMMENT ON COLUMN exoplanets.sy_kepmagsymerr IS 'Whether the uncertainty of sy_kepmag is symmetric: 1 = symmetric, 0 = asymmetric.';
COMMENT ON COLUMN exoplanets.sy_kepmaglim IS 'Limit flag for sy_kepmag: 0 = measurement, 1 = upper limit, -1 = lower limit.';
COMMENT ON COLUMN exoplanets.sy_kepmagstr IS 'sy_kepmag formatted for display together with its uncertainties. May contain HTML (<div>, <span>) and entities such as &plusmn; or &gt;.';
COMMENT ON COLUMN exoplanets.sy_kepformat IS 'Display format for sy_kepmag (internal archive use; almost always null). Note: the API names it sy_kepformat, not sy_kepmagformat.';
COMMENT ON COLUMN exoplanets.sy_kepmag_solnid IS 'ID of the solution (row in the ps table) that sy_kepmag was taken from. null if it is a calculated value.';
COMMENT ON COLUMN exoplanets.sy_kepmag_reflink IS 'Bibliographic reference for sy_kepmag as an HTML <a> link (usually to NASA ADS). If the archive calculated the value, the link text is "Calculated Value".';
