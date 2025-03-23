const positions = {
  top_left: "top_left",
  top_right: "top_right",
  top_center: "top_center",
  bottom_left: "bottom_left",
  bottom_right: "bottom_right",
  bottom_center: "bottom_center",
  middle_right: "middle_right",
  middle_left: "middle_left",
  middle_center: "middle_center",
  app: "app",
  clalbit: "clalbit",
};

export const staticList: {
  url: string;
  title: string;
  imageUrl: string;
  position?: string;
}[] = [
  {
    url: "https://dan.co.il/",
    title: "דן - תחבורה ציבורית",
    imageUrl: "https://upload.wikimedia.org/wikipedia/he/0/08/DanBuses.svg",
    position: positions.bottom_left,
  },
  {
    url: "https://www.ynet.co.il/home/0,7340,L-8,00.html",
    title: "ynet - חדשות, כלכלה, ספורט ובריאות - דיווחים שוטפים מהארץ ומהעולם",
    imageUrl:
      "https://ynet-pic1.yit.co.il/picserver5/wcm_upload/2021/06/02/BylDa46E900/ynet_menu_logo_2x.png",
    position: positions.top_left,
  },
  {
    url: "https://www.discountbank.co.il/",
    title: "בנק דיסקונט",
    imageUrl: "https://butterfly-button.web.app/img/discount.png",
    position: positions.bottom_left,
  },
  {
    url: "https://www.bankhapoalim.co.il/he",
    title: "בנק הפועלים",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/9/90/BankHapoalim.svg",
    position: positions.bottom_center,
  },
  {
    url: "https://www.migdal.co.il/",
    title: "מגדל: חברת ביטוח, פנסיה, פיננסים, השקעות, וחיסכון ",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/he/thumb/3/3e/%D7%9E%D7%92%D7%93%D7%9C_%D7%97%D7%91%D7%A8%D7%94_%D7%9C%D7%91%D7%99%D7%98%D7%95%D7%97.svg/180px-%D7%9E%D7%92%D7%93%D7%9C_%D7%97%D7%91%D7%A8%D7%94_%D7%9C%D7%91%D7%99%D7%98%D7%95%D7%97.svg.png",
    position: positions.bottom_center,
  },
  {
    url: "https://www.tikshoov.co.il/",
    title: "תקשוב - חברת השירות של ישראל",
    imageUrl: "https://media.getmood.io/warehouse/dynamic/441169.png",
    position: positions.bottom_left,
  },
  {
    url: "https://www.moreinvest.co.il/",
    title: "בית השקעות - עושים MORE בשביל הכסף שלך | מור בית השקעות",
    imageUrl: "https://www.moreinvest.co.il/preview/14713.jpg",
    position: positions.bottom_left,
  },
  {
    url: "https://www.remax-israel.com/",
    title: "דירות למכירה, בתים למכירה - רי/מקס ישראל",
    imageUrl: "https://www.remax-israel.com/common/images/remax-logo-og.jpg",
    position: positions.bottom_left,
  },
  {
    url: "http://www.dimri.co.il",
    title: "י.ח.דמרי חברת נדלן ובניה מובילה – מהחזון ועד ",
    imageUrl:
      "https://www.dimri.co.il/wp-content/uploads/2023/05/Group-407.svg",
    position: positions.top_left,
  },
  {
    url: "https://www.vaadmax.co.il",
    title: "ועד עובדי מקס",
    imageUrl:
      "https://holunbhs26wy-u4504.pressidiumcdn.com/wp-content/uploads/2018/08/TransLogo.png",
    position: positions.bottom_right,
  },
  {
    url: "https://www.sheba.co.il/",
    title: "המרכז הרפואי שיבא תל השומר",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/he/thumb/4/41/ShebaNew.svg/300px-ShebaNew.svg.png",
    position: positions.bottom_right,
  },
  {
    url: "https://cellcom.co.il/",
    title: "סלקום | cellcom",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/he/thumb/4/40/Cellcom_Logo.svg/1199px-Cellcom_Logo.svg.png?20110801211817",
    position: positions.top_left,
  },
  {
    url: "https://www.deasy.co.il/",
    title: "דיזנהאוז",
    imageUrl:
      "https://www.deasy.co.il/clients/static/deasy2019/images/brand.png",
    position: positions.bottom_right,
  },
  {
    url: "https://www.bestore.co.il/",
    title: "מוצרי פארם, קוסמטיקה ובית מרקחת אונליין | Be",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/he/thumb/c/c5/Be_by_Shufersal_2018_logo.svg/225px-Be_by_Shufersal_2018_logo.svg.png",
    position: positions.bottom_center,
  },
  {
    url: "https://www.shufersal.co.il/online/he/A",
    title: "סופרמרקט שופרסל אונליין | משלוחים מהסופר עד הבית | Shufersal",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/he/f/f0/ShufersalLogo.svg",
    position: positions.bottom_center,
  },
  {
    url: "https://play.google.com/store/apps/details?id=com.Shufersal.Employees",
    title: "שופרסל עובדים - Apps on Google Play",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/he/f/f0/ShufersalLogo.svg",
    position: positions.app,
  },
  {
    url: "http://www.raanana.muni.il",
    title: "עיריית רעננה",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Coat_of_arms_of_Raanana.svg/650px-Coat_of_arms_of_Raanana.svg.png",
    position: positions.bottom_center,
  },
  {
    url: "https://www.meuhedet.co.il/",
    title: "קופ״ח מאוחדת",
    imageUrl: "https://www.meuhedet.co.il/media/5401/logo_neuhedet.png",
    position: positions.top_right,
  },
  {
    url: "https://play.google.com/store/apps/details?id=org.meuhedet.android&gl=US",
    title: "מאוחדת - Apps on Google Play",
    imageUrl:
      "https://play-lh.googleusercontent.com/5UV_LDC62y2L4jrGEwPiTI91wL6S_Qw0o4yS1mBeWXTMBqWsTBK0dRhq9-j_04b_QZ0",
    position: positions.app,
  },
  {
    url: "https://site.ship.co.il/",
    title: "UPS",
    imageUrl: "https://site.ship.co.il/Content/easyship/img/social-logo.jpg",
    position: positions.bottom_left,
  },
  {
    url: "https://www.tasmc.org.il/",
    title: "איכילוב",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/he/thumb/b/bc/Soraski2021.svg/902px-Soraski2021.svg.png?20211018114517",
    position: positions.app,
  },
  {
    url: "https://play.google.com/store/apps/details?id=com.wendi.doralon&hl=he&gl=US",
    title: "דור אלון- עובדים - אפליקציות ב-Google Play",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/he/thumb/4/4f/Dor_Alon_Logo.svg/225px-Dor_Alon_Logo.svg.png",
    position: positions.app,
  },
  {
    url: "https://www.clalbit.co.il/",
    title: "כלל ביטוח ופיננסים - דף הבית",
    imageUrl: "https://www.clalbit.co.il/favicon.ico",
    position: positions.clalbit,
  },
  {
    url: "https://www.maccabi4u.co.il/",
    title: "מכבי שירותי בריאות",
    imageUrl:
      "https://www.maccabi4u.co.il/new/Style/Images/SharedIcons/FAVICON-MACCABI.ico",
    position: positions.bottom_left,
  },
  {
    url: "https://yaelgroup.com/",
    title: "Yael Group | קבוצת יעל",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/9/9a/Logo-yaelgroup-_NEW.png",
    position: positions.bottom_right,
  },
  {
    url: "https://www.amigour.co.il/",
    title: "עמיגור ניהול נכסים",
    imageUrl:
      "https://www.amigour.co.il/images/logo/cnt_contact_262293_contact_logo.jpg",
    position: positions.top_center,
  },
  {
    url: "https://www.iai.co.il",
    title: "התעשייה האווירית הישראלית",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/he/thumb/c/cf/Israel_Air_Industry.svg/302px-Israel_Air_Industry.svg.png?20200611142436",
    position: positions.app,
  },
  {
    url: "http://www.mei-avivim.co.il",
    title: "מי אביבים",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/he/thumb/0/0f/%D7%9E%D7%99-%D7%90%D7%91%D7%99%D7%91%D7%99%D7%9D.png/330px-%D7%9E%D7%99-%D7%90%D7%91%D7%99%D7%91%D7%99%D7%9D.png",
    position: positions.bottom_left,
  },
  {
    url: "https://www.herzliya.muni.il/",
    title: "עיריית הרצלייה",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/he/thumb/6/6d/%D7%9C%D7%95%D7%92%D7%95_%D7%A2%D7%99%D7%A8%D7%99%D7%99%D7%AA_%D7%94%D7%A8%D7%A6%D7%9C%D7%99%D7%94%2C_%D7%97%D7%96%D7%95%D7%9F_%D7%95%D7%94%D7%92%D7%A9%D7%9E%D7%94.svg/300px-%D7%9C%D7%95%D7%92%D7%95_%D7%A2%D7%99%D7%A8%D7%99%D7%99%D7%AA_%D7%94%D7%A8%D7%A6%D7%9C%D7%99%D7%94%2C_%D7%97%D7%96%D7%95%D7%9F_%D7%95%D7%94%D7%92%D7%A9%D7%9E%D7%94.svg.png",
  },
  {
    url: "https://www.adama.com/israel-mcw/he",
    title: " אדמה מכתשים עמוד הבית",
    imageUrl: "https://www.adama.com/israel-mcw/themes/custom/adama/logo.svg",
    position: positions.bottom_right,
  },
  {
    url: "https://soglowek.co.il/",
    title: "זוגלובק - 80 שנה של מומחיותזוגלובק - 80 שנה של מומחיות",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/he/f/f0/%D7%96%D7%95%D7%92%D7%9C%D7%95%D7%91%D7%A7.png",
  },
  {
    url: "https://www.gansipur.co.il/",
    title: "גן סיפור - מסעדות ידידותיות לילדים ולהורים",
    imageUrl: "https://media.getmood.io/warehouse/dynamic/61713.jpg",
    position: positions.bottom_left,
  },
  {
    url: "https://www.itu.org.il/",
    title: " הסתדרות המורים בישראל",
    imageUrl:
      "https://www.itu.org.il/wp-content/uploads/2019/12/histadrut-hamorim-logo.png",
    position: positions.bottom_left,
  },
  {
    url: "https://www.sabarhealth.co.il/?gad_source=1&gclid=Cj0KCQiAyoi8BhDvARIsAO_CDsCkHnmTEclSD_VV3q58NAumTDzD8ZZZmhVZzh_N2pWxScqcErdFQcsaArq0EALw_wcB",
    title: "צבר רפואה",
    imageUrl:
      "https://yt3.googleusercontent.com/tQKn8reCV9Re6TgRuk3N5RFBe1MKqm2mX4-qljz6Ul3w9zcZwVeLTP9aon-ADGXRAfycejBlzQ=s160-c-k-c0x00ffffff-no-rj",
    position: positions.bottom_left,
  },
  {
    url: "https://www.maof-hr.co.il/",
    title: "מעוף | חברת השמה, כוח אדם ✔️ אנשים שחושבים אנשים",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/1/13/%D7%9C%D7%95%D7%92%D7%95_-_%D7%A7%D7%91%D7%95%D7%A6%D7%AA_%D7%9E%D7%A2%D7%95%D7%A3.jpg?20201110074725",
    position: positions.bottom_right,
  },
  {
    url: "https://www.akko.muni.il/he/",
    title: "עיריית עכו",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/he/thumb/6/64/%D7%9C%D7%95%D7%92%D7%95_%D7%A2%D7%9B%D7%95.png/986px-%D7%9C%D7%95%D7%92%D7%95_%D7%A2%D7%9B%D7%95.png?20210630121707",
    position: positions.middle_right,
  },
  {
    url: "https://briuta-care.co.il/",
    title: "ברוכים הבאים לבריאותא",
    imageUrl: "https://briuta-care.co.il/Content/Resources/Header/logo.svg",
    position: positions.bottom_left,
  },
  {
    url: "https://www.loji.org.il/",
    title: "קרן אריה יהודה",
    imageUrl: "https://www.loji.org.il/wp-content/uploads/2020/10/logo.png",
    position: positions.top_right,
  },
  {
    url: "https://www.haifa.muni.il/",
    title:
      "עיריית חיפה - האתר הראשי של עיריית חיפה\t\t :\t\tעיריית חיפה\tעיריית חיפה - האתר הראשי של עיריית חיפה",
    imageUrl:
      "https://www.haifa.muni.il/wp-content/uploads/2024/06/haifamuni_logo_website-1.svg",
  },
  {
    url: "https://shomrat-pc.co.il/",
    title: "שמרת דיגיטל - מומחה מיחשוב ואינטרנט",
    imageUrl:
      "https://shomrat-pc.co.il/wp-content/uploads/2015/11/Logo-Master.png",
    position: positions.top_left,
  },
  {
    url: "https://www.ganeytikva.org.il/",
    title: "עיריית גני תקווה: האתר העירוני\t\t| עמוד בית",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/LOGO_GANEI_TIKVA.png/375px-LOGO_GANEI_TIKVA.png",
  },
  {
    url: "http://bydindesign.com",
    title: "מיתוג | דינה דצקובסקי - עיצוב גרפי וניהול מדיה | חיפה",
    imageUrl:
      "https://static.wixstatic.com/media/afd014_39ffa1aef6c646ebbaffceb5b232e1b6~mv2.png/v1/fill/w_300,h_80,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/logo.png",
  },
  {
    url: "https://karneishomron.co.il/",
    title: "קרני שומרון",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Coat_of_arms_of_Karnei_Shomron.svg/240px-Coat_of_arms_of_Karnei_Shomron.svg.png",
    position: positions.bottom_right,
  },
  {
    url: "https://dorpeleg.recipes/",
    title: "Dor Peleg – אתר המתכונים של דור פלג",
    imageUrl: "https://dorpeleg.recipes/wp-content/uploads/2020/09/dsc7416.jpg",
  },
  {
    url: "https://www.yamshelhaverim.org.il/",
    title: "עמותת ים של חברים | חרם חברתי | ישראל",
    imageUrl:
      "https://static.wixstatic.com/media/d10d6a_93e61080bfc84987898876967f980161~mv2.png/v1/fill/w_106,h_106,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/d10d6a_93e61080bfc84987898876967f980161~mv2.png",
  },
  {
    url: "https://www.ohelmenashe.com/",
    title: "קהילת אוהל מנשה | אוהל מנשה | יוקנעם עילית",
    imageUrl:
      "https://static.wixstatic.com/media/7a1bc7_b28a03e746cd451d91f20b4267136d6a%7Emv2.png/v1/fit/w_2500,h_1330,al_c/7a1bc7_b28a03e746cd451d91f20b4267136d6a%7Emv2.png",
  },
  {
    url: "https://www.mivegamma.co.il/",
    title:
      "מי וגם מה - מוצרים מעוצבים בהתאמה אישית | מוצרים לבית ומתנות מקוריות",
    imageUrl:
      "https://static.wixstatic.com/media/d99105_a07a6d04f1be4a328b34668bbec44d50~mv2.jpg/v1/fill/w_1920,h_678,al_c/d99105_a07a6d04f1be4a328b34668bbec44d50~mv2.jpg",
  },
  {
    url: "https://www.hadera.muni.il",
    title: "אתר העיר עיריית חדרה",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Hadera_COA.png/150px-Hadera_COA.png",
  },
  {
    url: "https://hodayataiber.com/",
    title: "HOME - הודיה טיבר",
    imageUrl:
      "https://hodayataiber.com/wp-content/uploads/2021/11/cropped-Asset-1-8.png",
    position: positions.bottom_right,
  },
  {
    url: "https://www.insights.us/he",
    title: "תובנות | מחברים את הקהילה, ומובילים שינוי.",
    imageUrl:
      "https://cdn.prod.website-files.com/5b9a44ba7d3b3e05ba52c1e1/5d342e3b47f4bbc23198de38_Open-Graph-Image-HE.jpg",
  },
  {
    url: "https://www.metapeletbegvulot.com/",
    title:
      "תמר פראנק - מטפלת בגבולות | סדנאות להצבת גבולות ברחבי הארץ | Tamar Frank | Israel",
    imageUrl:
      "https://scontent.ftlv6-1.fna.fbcdn.net/v/t39.30808-6/469869791_122190667076131754_6522767787022633471_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=y39oh9y5tjIQ7kNvgGmY-Zm&_nc_zt=23&_nc_ht=scontent.ftlv6-1.fna&_nc_gid=AN_JVthxzC292FQNF5-KqvC&oh=00_AYAFBIezYTwGqE1_4LMdReB0MQlm9EF-8ADx48teeN4hig&oe=6792E470",
  },
  {
    url: "https://www.pzeev.org.il",
    title: "מינהל קהילתי פסגת זאב",
    imageUrl:
      "https://www.pzeev.org.il/productImages2/50/2021/11/01/image1635765261.png",
  },
  {
    url: "http://luch.co.il",
    title: "עיצוב אתרים ובנייה בקטע אחר לגמרי | מעצבת אתרים שעובדים",
    imageUrl: "https://www.luch.co.il/wp-content/uploads/2023/04/logo2-2.png",
  },
  {
    url: "https://www.har-adar.muni.il/",
    title: "מועצה מקומית הר אדר",
    imageUrl: "https://www.menashe.co.il/content/images/logo.png",
    position: positions.bottom_left,
  },
  {
    url: "http://www.qbialik.org.il",
    title: "עיריית קרית ביאליק – האתר הרשמי",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/he/thumb/2/28/QiryatBialik.svg/225px-QiryatBialik.svg.png",
  },
  {
    url: "https://www.bugaboo-distributor.co.il/",
    title: "עגלות תינוק בוגבו | בוגבו ישראל (bugaboo)",
    imageUrl:
      "https://www.bugaboo-distributor.co.il/wp-content/uploads/logo.png",
  },
  {
    url: "https://www.sulamtsor.org/",
    title:
      "סולם צור בית ספר תיכון בגשר הזיו. סולם צור תיכון שש שנתי | סולם צור | Israel",
    imageUrl:
      "https://static.wixstatic.com/media/28e814_dbf5e53acab34bf5ab86c0cd12906b56~mv2.png/v1/fill/w_408,h_306,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/111.png",
  },
  {
    url: "https://www.sng.org.il/",
    title: "מועצה אזורית שער הנגב shaar hanegev",
    imageUrl: "https://www.sng.org.il/content/images/logo.png",
  },
  {
    url: "http://shlomitlapid.co.il",
    title:
      "עמוד הבית - אה! השראה מעשית , שלומית לפיד, מאמנת עסקיתכלי נגישותהגדל טקסטהקטן טקסטגווני אפורניגודיות גבוההניגודיות הפוכהרקע בהירהדגשת קישוריםפונט קריאאיפוס",
    imageUrl:
      "https://shlomitlapid.co.il/wp-content/uploads/2020/11/Untitled-1.jpg",
  },
  {
    url: "http://asakim.ai",
    title: "בינה מלאכותית לעסקים - להניע את העסק שלך אל העתיד",
    imageUrl:
      "https://asakim.ai/wp-content/uploads/2023/01/yanivronen_background_cover_AI_Business_code_7dc00de8-25ec-401e-bff7-c5047308c2aa.png",
  },
  {
    url: "https://smartix.co.il",
    title:
      "smartix בית תוכנה – בית תוכנה | פיתוח מערכות WEB | פיתוח פתרונות דיגיטליים",
    imageUrl:
      "https://smartix.co.il/wp-content/uploads/2021/02/Asset-2-1024x262.png",
  },
  {
    url: "https://www.levinstein.co.il",
    title: "ראשי - קבוצת משולם לוינשטין",
    imageUrl:
      "https://www.levinstein.co.il/wp-content/uploads/2020/03/crane.png",
  },
  {
    url: "http://easylist.co.il/",
    title: "איזיליסט – EasyList – תוכנה לניהול סוכנויות טרייד אין ומגרשי רכב",
    imageUrl:
      "https://www.easylist.co.il/wp-content/uploads/2020/05/ICON-150x150.png",
  },
  {
    url: "https://www.bdicode.co.il/",
    title:
      "דירוג חברות, שירותי מידע עסקי וניהול סיכונים – BDI cofaceדירוג חברות, שירותי מידע עסקי וניהול סיכונים – BDI coface",
    imageUrl:
      "https://www.bdicode.co.il/wp-content/themes/bdi/images/favicon/android-icon-192x192.png",
  },
  {
    url: "https://www.lev-hasharon.com",
    title: "מועצה אזורית לב השרון",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Lev_HaSharon_Regional_Council_COA.svg/225px-Lev_HaSharon_Regional_Council_COA.svg.png",
  },
  {
    url: "http://Itchy-foot.com",
    title: "ITCHY FOOT - רילוקיישן לצרפת והרפתקאות נוספות",
    imageUrl:
      "https://itchy-foot.com/wp-content/uploads/2020/08/%D7%9C%D7%95%D7%92%D7%95-%D7%9C%D7%91%D7%9C%D7%95%D7%92-%D7%A9%D7%9C%D7%A0%D7%95-1_result_1.webp",
  },
  {
    url: "https://ilaypc.co.il",
    title: "Tech Station פתרונות מחשוב",
    imageUrl:
      "https://g6e3i7b4.rocketcdn.me/wp-content/uploads/2023/02/logo4mail.png",
  },
  {
    url: "http://www.littlefeet.co.il",
    title:
      "חנות תינוקות ליטל פיט | מוצרי תינוקות אונליין במחירים מדהימים | little feetLittle Feets - מוצרים לילדים ותינוקות | צעצועים ומשחקים | עיצוב חדרים לילדים ותינוקות ועוד",
    imageUrl:
      "https://littlefeet.co.il/wp-content/uploads/elementor/thumbs/Little-Feets-svg-3-pdff48pg7r97g2qjgmwrh5mu17zdqm2u0r080f28u4.png",
  },
  {
    url: "http://www.marom-dutyfree.com",
    title:
      "Home - מרום דיוטי פרי | specializes in the dutyfree and travel retail platformsAccessibility ToolsIncrease TextDecrease TextGrayscaleHigh ContrastNegative ContrastLight BackgroundLinks UnderlineReadable FontReset",
    imageUrl:
      "https://marom-dutyfree.com/wp-content/uploads/2020/06/מרום_לבן-03.png",
  },
  {
    url: "https://yael-travel.co.il/",
    title: "בית - יעל ולטייל תכנון טיולים לארצות הברית בהתאמה אישית",
    imageUrl:
      "http://yael-travel.co.il/wp-content/uploads/2020/06/Artboard-15-768x525.png",
  },
  {
    url: "https://politicallycorret.co.il/",
    title: "עמוד הבית | פוליטיקלי קוראת",
    imageUrl:
      "https://politicallycorret.co.il/wp-content/uploads/2024/07/mobile_ad.jpg",
  },
  {
    url: "https://play.google.com/store/apps/details?id=com.kimaia.mekomi&hl=he&gl=US",
    title: "מקומי - אפליקציות ב-Google Play",
    imageUrl:
      "https://play-lh.googleusercontent.com/x7nIg-3s2wjaKq6DwW_IiOt8cW21hah84_LjlVMdtBOhdGCYvwCrHtDd_skMEGI_G7b1",
    position: positions.app,
  },
  {
    url: "https://apps.apple.com/il/app/id1501310147",
    title: "‎איכילוב בשבילך on the App Store",
    imageUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/4b/87/cf/4b87cf1b-7fbf-006b-cf2d-cf936cb18e13/AppIcon-1x_U007emarketing-0-7-0-85-220-0.png/1200x630wa.png",
    position: positions.app,
  },
  {
    url: "https://akshiva.co.il/",
    title: "מאגר ענק של שאלות על חיים - שאלות ותשובות למגזר החרדי | אקשיבה",
    imageUrl: "https://akshiva.co.il/wp-content/uploads/2019/11/logo-1.png",
  },
  {
    url: "https://www.brn-eng.co.il/",
    title: "חברת הנדסת בניין | ב.ר.נ. הנדסה בע״מ | ישראל",
    imageUrl:
      "https://static.wixstatic.com/media/563381_80d10c86a05f48c9883bc5606a66b4f1~mv2.png/v1/fill/w_93,h_61,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/563381_80d10c86a05f48c9883bc5606a66b4f1~mv2.png",
  },
  {
    url: "https://hof-hasharon.co.il/",
    title: "מועצה אזורית חוף השרון",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/he/a/ab/Hof_HaSharon_COA.png",
  },
  {
    url: "https://www.hrhevron.co.il/",
    title: "מועצה אזורית הר חברון",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Flag_of_Har_Hebron.svg/300px-Flag_of_Har_Hebron.svg.png",
  },
  {
    url: "https://play.google.com/store/apps/details?id=esbinaltd.hofhasharon",
    title: "מועצה אזורית חוף השרון - Apps on Google Play",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/he/a/ab/Hof_HaSharon_COA.png",
    position: positions.app,
  },
  {
    url: "https://moonart.co.il/",
    title: "עיצוב גרפי מיתוג עסקי בניית אתרים ודפי נחיתה | סטודיו MoonArt",
    imageUrl:
      "https://moonart.co.il/wp-content/uploads/2024/09/%D7%A9%D7%A4%D7%94-%D7%97%D7%93%D7%A9%D7%94-03.png",
  },
  {
    url: "https://www.urielatlas.co.il/",
    title: "מורה לגיטרה: למדו לנגן בגיטרה עם המון כיף והנאה - אוריאל אטלס",
    imageUrl:
      "https://www.urielatlas.co.il/wp-content/webpc-passthru.php?src=https://www.urielatlas.co.il/wp-content/uploads/2022/09/2-1-1024x726.jpg&nocache=1",
  },
  {
    url: "https://sunkid.co.il/",
    title: "חמניה- תוכן איכותי להורים",
    imageUrl:
      "https://sunkid.co.il/wp-content/uploads/2020/05/%D7%97%D7%9E%D7%A0%D7%99%D7%99%D7%94-%D7%9C%D7%95%D7%92%D7%95-2.webp",
  },
  {
    url: "https://mamaecura.com/",
    title: "Mamaecura - קורסים על חלימה וצמחי מרפא מאת תמר רימון סיטון",
    imageUrl:
      "https://mamaecura.com/wp-content/uploads/2022/06/Mamae-Logo-Header.d110a0.webp",
  },
  {
    url: "https://www.yavne.muni.il/",
    title: "עיריית יבנה",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Coat_of_Arms_of_Yavne.svg/225px-Coat_of_Arms_of_Yavne.svg.png",
  },
  {
    url: "https://www.ecosupp.co.il/",
    title: "תוספי תזונה, ויטמינים ומינרלים בספיגה גבוהה | אקוסאפ EcoSupp",
    imageUrl:
      "https://www.ecosupp.co.il/wp-content/uploads/2020/11/ECOSUPP_LOGO2020.jpg",
  },
  {
    url: "https://play.google.com/store/apps/details?id=com.zabar.ewavemobile.zabarApp",
    title: "סברס - Apps on Google Play",
    imageUrl:
      "https://play-lh.googleusercontent.com/ua5EtKoBNGeD1-PEpZrkYoi64kNvhmEQCvW0TEIr8-RfryDgp5QseD4tQx3uG3DFZpg",
    position: positions.app,
  },
  {
    url: "https://play.google.com/store/apps/details?id=com.ctconnect.harhevron",
    title: "הר חברון - Apps on Google Play",
    imageUrl:
      "https://play-lh.googleusercontent.com/Bv171BYYe4yAsdrpJf9QH3fyzkC0wxVZyOSevBkGKVUot_Rs7iLLMW0wuMFt2_SETiQ",
    position: positions.app,
  },
  {
    url: "https://arielec.co.il/",
    title: "החברה הכלכלית לאריאל",
    imageUrl: "https://arielec.co.il/content/images/fb.png",
  },
  {
    url: "https://apps.apple.com/il/app/id1588607566",
    title: "‎מועצה אזורית חוף השרון on the App Store",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/he/a/ab/Hof_HaSharon_COA.png",
  },
  {
    url: "https://baitisraeli.co.il/",
    title: "גוש עציון",
    imageUrl: "https://baitisraeli.co.il/content/images/logo.png?v=2",
  },
  {
    url: "https://www.mrv-yit.com/",
    title: "About | מירב היתרונות",
    imageUrl:
      "https://static.wixstatic.com/media/4cab79_4041f835edbc443ab371678e3934fc52~mv2.png/v1/fill/w_292,h_164,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Untitled-1-02_edited_edited_edited.png",
  },
  {
    url: "https://play.google.com/store/apps/details?id=com.ideomobile.maccabi",
    title: "מכבי שירותי בריאות - Apps on Google Play",
    imageUrl:
      "https://play-lh.googleusercontent.com/kQdyqjQaB3xi1EYzNCOkzfejwcKuRwRrW-S6QM_5acb9xtRh3cwDIslrHrD5BxVeY3vb",
    position: positions.app,
  },
  {
    url: "https://apps.apple.com/app/id6444006699",
    title: "‎סברס on the App Store",
    imageUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/b6/f0/55/b6f0558e-871c-a618-47aa-184c0175f892/AppIcon-1x_U007emarketing-0-7-0-85-220-0.png/1200x630wa.png",
  },
  {
    url: "https://apps.apple.com/il/app/id379119093",
    title: "‎מכבי שירותי בריאות on the App Store",
    imageUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/56/74/70/5674708f-ff58-1aec-7e12-a7c5c8d40ddd/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/1200x630wa.png",
  },
  {
    url: "https://www.studiotiltan.co.il/",
    title:
      "Studio Tiltan - Logo design, presentation design, WIX website design סטודיו תלתן",
    imageUrl:
      "https://static.wixstatic.com/media/d4d9e4_2545278423fe429a94c82b15024c8f4a~mv2.jpg/v1/fill/w_722,h_227,al_c/d4d9e4_2545278423fe429a94c82b15024c8f4a~mv2.jpg",
  },
  {
    url: "https://adam-shalem.co.il/https://sharonadam.co.il/%d7%90%d7%95%d7%93%d7%95%d7%aa/",
    title: " אדם שלם",
    imageUrl:
      "https://adam-shalem.co.il/wp-content/uploads/2024/01/%D7%9C%D7%95%D7%92%D7%95-%D7%A7%D7%98%D7%9F-.png",
  },
  {
    url: "http://www.doctorvet.co.il",
    title:
      "בית חולים לחיות וטרינר בכיכר: מרפאה וטרינרית 24/7 שירותי חירום - וטרינר תל אביב",
    imageUrl:
      "https://www.doctorvet.co.il/wp-content/uploads/2019/02/vet-logo.png",
  },
  {
    url: "https://www.akam.org.il/",
    title: "עמוד הבית - אקם",
    imageUrl:
      "https://www.akam.org.il/wp-content/uploads/2020/01/LOGO-VERT-768x768-1.png",
  },
  {
    url: "https://www.wp-studio.co.il/",
    title: "פיתוח אתרי אינטרנט ופתרונות מתקדמים בוורדפרס - WP-STUDIO",
    imageUrl:
      "https://www.wp-studio.co.il/wp-content/uploads/2019/05/logo-wp-studio-black.png",
  },
  {
    url: "https://hagitplaytherapy.co.il/",
    title:
      "חגית קירשנר-שלום – פסיכולוגית קוגניטיבית, מוסמכת טיפול במשחק וטיפול דיאדי, הדרכת הורים, ומדריכה",
    imageUrl:
      "https://hagitplaytherapy.co.il/wp-content/uploads/2022/04/beach-gf0c62d8a6_1920-1.jpg",
  },
  {
    url: "https://fly-guy.club/",
    title: "Fly Guy - שרותים לעסקים קטנים - בניית אתרים - אתר תדמית",
    imageUrl: "https://fly-guy.club/wp-content/uploads/2019/09/FLY_.png",
  },
  {
    url: "https://www.pardes-hanna-karkur.muni.il/",
    title: "פרדס חנה כרכור",
    imageUrl:
      "https://www.pardes-hanna-karkur.muni.il/content/images/logo2020.png",
  },
  {
    url: "http://www.masham.org.il/",
    title: "מרכז השלטון המקומי בישראל",
    imageUrl: "http://www.masham.org.il/content/images/fb.png",
  },
  {
    url: "http://sgula.com",
    title: "טיפול רגשי אבחון פסיכולוגי לילדים ונוער ברחובות",
    imageUrl:
      "https://lh5.googleusercontent.com/P52VteIevnn1f8yeIpPjoVzI7yY3a-SehUcjMcNWsSbVC94msvtbNfVZX0yTauBdiRhR-Q=w16383",
  },
  {
    url: "http://www.hms.org.il",
    title: "מוזיאוני חיפה - שישה מוזיאונים במסגרת אחתBLOG",
    imageUrl: "https://www.hms.org.il/images/logo.png",
  },
  {
    url: "http://bte.co.il",
    title: "בית - ביטוח אישי",
    imageUrl: "https://bte.co.il/wp-content/uploads/2021/06/Asset-38@X.png",
  },
  {
    url: "https://www.inbardror-law.co.il",
    title: "ענבר דרור,עורכת דין לדיני משפחה, ליווי וייצוג תיקי גירושין 10",
    imageUrl:
      "https://inbardror-law.co.il/wp-content/uploads/2020/08/inbar-dror-logo.svg",
  },
  {
    url: "https://www.migdal-haemeq.muni.il",
    title: "עיריית מגדל העמק - \n\tדף הבית",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Coat_of_arms_of_Migdal_Haemek.svg/225px-Coat_of_arms_of_Migdal_Haemek.svg.png",
    position: positions.top_left,
  },
  {
    url: "http://www.kyair.org.il",
    title: "כוכב יאיר צור יגאל - \n\tדף הבית",
    imageUrl: "https://www.kyair.org.il/SiteCollectionImages/Logo.png",
    position: positions.top_left,
  },
  {
    url: "https://www.kiryatono.muni.il/",
    title: "עיריית קריית אונו",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/%D7%A1%D7%9E%D7%9C_%D7%A7%D7%A8%D7%99%D7%99%D7%AA_%D7%90%D7%95%D7%A0%D7%95.svg/225px-%D7%A1%D7%9E%D7%9C_%D7%A7%D7%A8%D7%99%D7%99%D7%AA_%D7%90%D7%95%D7%A0%D7%95.svg.png",
    position: positions.top_left,
  },
  {
    url: "https://play.google.com/store/apps/details?id=esbinaltd.KiryatOno",
    title: "עיריית קריית אונו - Apps on Google Play",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/%D7%A1%D7%9E%D7%9C_%D7%A7%D7%A8%D7%99%D7%99%D7%AA_%D7%90%D7%95%D7%A0%D7%95.svg/225px-%D7%A1%D7%9E%D7%9C_%D7%A7%D7%A8%D7%99%D7%99%D7%AA_%D7%90%D7%95%D7%A0%D7%95.svg.png",
    position: positions.app,
  },
  {
    url: "https://feetofeet.ngf.co.il/",
    title: "FEET TO FEET – פדיקור טיפולי לגברFEET TO FEET – פדיקור טיפולי לגבר",
    imageUrl:
      "https://feetofeet.ngf.co.il/wp-content/uploads/2023/02/WhatsApp_Image_2023-02-02_at_14.28.40-removebg-preview.png",
  },
  {
    url: "https://kulialma.com/",
    title: "Kuli Alma כולי עלמא",
    imageUrl: "https://kulialma.com/assets/images/image01.png?v=427c0b4a",
  },
  {
    url: "https://www.sdotnegev.org.il/",
    title: "מועצה אזורית שדות נגב",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/he/c/c1/Sdot_Negev_Regional_Council_COA.png",
    position: positions.bottom_left,
  },

  {
    url: "https://apps.apple.com/il/app/%D7%A2%D7%99%D7%A8%D7%99%D7%99%D7%AA-%D7%A7%D7%A8%D7%99%D7%99%D7%AA-%D7%90%D7%95%D7%A0%D7%95/id1600061809",
    title: "‎עיריית קריית אונו on the App Store",
    imageUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/a6/3f/91/a63f9172-b181-ab97-4e5a-90b1aae4e61b/AppIcon-2-1x_U007emarketing-0-10-0-85-220.png/1200x630wa.png",
    position: positions.app,
  },
  {
    url: "https://cont-edu.technion.ac.il/",
    title:
      "הטכניון - לימודי המשך | לימודי חוץ | לימודי תעודה | לימודים ביחידה ללימודי המשךהטכניון - לימודי המשך | לימודי חוץ | לימודי תעודה | לימודים ביחידה ללימודי המשך",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/he/thumb/c/c6/Technion_new_logo_Hebrew.svg/225px-Technion_new_logo_Hebrew.svg.png",
    position: positions.bottom_right,
  },
  {
    url: "https://www.adama.com/israel-agan/he",
    title: "דף הבית אדמה אגן | ADAMA Israel Agan",
    imageUrl: "https://www.adama.com/israel-mcw/themes/custom/adama/logo.svg",
  },
  {
    url: "https://www.tel-aviv.gov.il/Pages/HomePage.aspx",
    title: "עיריית תל-אביב-יפו | עיריית תל אביב-יפו",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/he/thumb/e/e0/Tel_Aviv_New_Logo.svg/193px-Tel_Aviv_New_Logo.svg.png",
  },
  {
    url: "https://familytrips.co.il/",
    title:
      "טיולים בישראל - אטרקציות, לינה ומסלולי טיול קלים למשפחות - בשביל המשפחה",
    imageUrl:
      "https://familytrips.co.il/wp-content/uploads/2021/12/%D7%91%D7%A9%D7%91%D7%99%D7%9C-%D7%94%D7%9E%D7%A9%D7%A4%D7%97%D7%94-%D7%9C%D7%95%D7%92%D7%95-%D7%9C%D7%9C%D7%90-%D7%9C%D7%95%D7%92%D7%95.jpg",
    position: positions.bottom_center,
  },
  {
    url: "https://www.marom.co.il/",
    title:
      "מרום Marom - דגלים , קידום מכירות , מוצרי פרסום , קד מ , סמלים , גביעים , דיוטי פרי , דגלי , דגלונים , דגל ישראל,מתנות , מוצרי נוסעים , ייצור דגליםarrow-upכלי נגישותהגדל טקסטהקטן טקסטגווני אפורניגודיות גבוההניגודיות הפוכהרקע בהירהדגשת קישוריםפונט קריאאיפוס",
    imageUrl:
      "https://marom.co.il/wp-content/uploads/2021/03/IMG-20161127-WA0002-2.jpg",
  },
  {
    url: "https://fithouse.co.il/",
    title:
      "פיטהאוס, אימוני פילאטיס, אימוני כח וסייקל בקבוצה המובילה בישראל -  Fithouse",
    imageUrl:
      "https://static.wixstatic.com/media/2b57d8_9b3cc48859ee4a9191f7cff64fcd7a3f%7Emv2.jpg/v1/fit/w_2500,h_1330,al_c/2b57d8_9b3cc48859ee4a9191f7cff64fcd7a3f%7Emv2.jpg",
  },
  {
    url: "https://www.leeronparenting.com/",
    title: "לירון פיאחוטה: הנקה, שינה והורות צעירה",
    imageUrl:
      "https://static.wixstatic.com/media/59597a_aa73d7a953044824a39b67efdfe018b4%7Emv2.png/v1/fit/w_2500,h_1330,al_c/59597a_aa73d7a953044824a39b67efdfe018b4%7Emv2.png",
  },
  {
    url: "http://zefat.muni.il",
    title: "ראשי - עיריית צפת",
    imageUrl:
      "https://www.zefat.muni.il/wp-content/uploads/2020/09/MicrosoftTeams-image-1-1.png",
  },
  {
    url: "https://coverme.co.il/",
    title: "קאברמי | COVERME | האתר הגדול בישראל לקופסאות הפתעה אפורת",
    imageUrl: "https://coverme.co.il/wp-content/uploads/2022/02/Group-56.png",
  },
  {
    url: "https://pisga.ariel.muni.il/",
    title: "מרכז פסגה אריאל – מרכז לפיתוח סגלי הוראהWhatsApp",
    imageUrl:
      "https://static.wixstatic.com/media/50b598_bebadf80a8964ed19bebd40e34b44eba~mv2.png/v1/crop/x_159,y_0,w_123,h_120/fill/w_85,h_83,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/pisga_logo__web.png",
  },
  {
    url: "https://play.google.com/store/apps/details?id=gov.telaviv.digitel.beach",
    title: "דיגיתל שלי - Apps on Google Play",
    imageUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/77/fa/c8/77fac8c3-18a5-81aa-7e06-1e4c0e04ff5f/AppIcon-0-0-1x_U007emarketing-0-6-0-85-220.png/1200x630wa.png",
    position: positions.app,
  },
  {
    url: "https://www.kiryat-ata.org.il/",
    title: "דף הבית - קרית אתא",
    imageUrl:
      "https://www.kiryat-ata.org.il/wp-content/uploads/2021/06/cropped-logo@3x-150x150.png",
  },
  {
    url: "https://www.natura-li.co.il/",
    title:
      "חינה לשיער, צבע שיער ללא P.P.D ללא אמוניה Natura-li צבעי שיער טבעיים",
    imageUrl:
      "https://natura1.b-cdn.net/wp-content/uploads/2024/12/logo.png.webp",
  },
  {
    url: "https://apps.apple.com/il/app/id1422471711",
    title: "‎דיגיתל שלי on the App Store",
    imageUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/77/fa/c8/77fac8c3-18a5-81aa-7e06-1e4c0e04ff5f/AppIcon-0-0-1x_U007emarketing-0-6-0-85-220.png/1200x630wa.png",
    position: positions.app,
  },
  {
    url: "https://play.google.com/store/apps/details?id=com.nineoneone",
    title: "הלחצן של כלל - Apps on Google Play",
    imageUrl:
      "https://play-lh.googleusercontent.com/M6xm6YqoBOrBf1pSF1m-Wu_02xZ1GwPCmy0YGh6q2T9np4s7Gq2cghxeVRDrvHWc=w240-h480-rw",
    position: positions.app,
  },
  {
    url: "https://apps.apple.com/il/app/id1263108455",
    title: "‎שופרסל שותפים on the App Store",
    imageUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/cd/75/68/cd75686c-61ff-b09e-d6b5-c8a78b44284e/AppIcon-0-0-1x_U007emarketing-0-0-0-10-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/1200x630wa.png",
  },
  {
    url: "http://www.sherut.net",
    title: "שירות.נט | יחד נקבל שירות טוב יותר",
    imageUrl: "https://www.servul.com/img/logo.png",
  },
  {
    url: "https://apps.apple.com/il/app/id1490749626",
    title: "‎הלחצן של כלל on the App Store",
    imageUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/41/6f/0e/416f0efe-0093-975b-ca83-140b27bdc8ab/AppIcon-1-1x_U007emarketing-0-8-0-85-220-0.png/1200x630wa.png",
  },
  {
    url: "http://www.inbalwenger.co.il",
    title:
      "פיתוח חוסן אישי וארגוני - ענבל ונגר - פיתוח חוסן אישי וארגוניכלי נגישותהגדל טקסטהקטן טקסטגווני אפורניגודיות גבוההניגודיות הפוכהרקע בהירהדגשת קישוריםפונט קריאאיפוס",
    imageUrl:
      "https://www.inbalwenger.co.il/wp-content/uploads/2019/07/11-150x150.png",
  },
  {
    url: "http://medico.co.il",
    title: "מדיקו | אתר הבריאות המוביל בישראל | Medico",
    imageUrl:
      "https://www.medico.co.il/wp-content/uploads/2019/10/medico-logo-01-small.png",
  },
  {
    url: "http://atractivo.co.il",
    title: "פרו פרודוקטס - פרו פרודוקטס",
    imageUrl:
      "https://pro-products.co.il/wp-content/uploads/2023/10/logo-pro.png",
  },
  {
    url: "http://www.teva-aroma.com",
    title:
      "בראשית הכי טבעי לעור שלך - ראשיsearch2, search, magnifier, lookup, find",
    imageUrl:
      "https://sfilev2.f-static.com/image/users/1075762/ftp/my_files/logo.jpg?id=31934320",
  },
  {
    url: "https://www.ccc.co.il/",
    title: "שירותי מחשוב ענן לעסקים - פתרונות ענן ושירותי IT מתקדמים לעסק",
    imageUrl:
      "https://www.ccc.co.il/wp-content/uploads/2022/06/cropped-favicon-32x32.png",
  },
  {
    url: "https://pellegift.co.il/",
    title: "חנות מתנות באינטרנט - אתר מתנות מעצימות עם מסר - PellegiftPayPal",
    imageUrl:
      "https://pellegift.co.il/cdn/shop/files/logo_pelle_256x256_crop_center_9703a38f-8ee8-4ce2-8e19-cb9439d09365_1200x.png?v=1614313534",
  },
  {
    url: "https://play.google.com/store/apps/details?id=com.mobitti.clalit",
    title: "כללית בשבילי - Apps on Google Play",
    imageUrl:
      "https://play-lh.googleusercontent.com/cxLuEK7zJZTW2OIEMKcVU_Wwg5GhpI-OAqKclnF-VsFyOs-8GrwDaE0wcfb7pHFYApQe",
    position: positions.app,
  },
  {
    url: "https://www.glt.org.il/",
    title: "מועצה אזורית גליל תחתון",
    imageUrl: "https://www.glt.org.il/content/images/fb.png",
  },
  {
    url: "https://www.wgalil.ac.il/",
    title:
      "תואר ראשון ושני ולימודי תעודה במגוון תחומים | המכללה האקדמית גליל מערבי",
    imageUrl:
      "https://wgalil.ac.il/wp-content/uploads/2021/11/03-11-2021-17-27-02-1.png",
  },
  {
    url: "https://apps.apple.com/us/app/id1671995035",
    title: "‎כללית בשבילי on the App Store",
    imageUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/f9/bd/0c/f9bd0c5f-8d3d-6780-c660-6b2f1940dfda/AppIcon-0-0-1x_U007emarketing-0-10-0-85-220.png/1200x630wa.png",
  },
  {
    url: "http://Ronishe.co.il",
    title: "רוני שינקמן - Ronishe Ltd.",
    imageUrl:
      "https://ronishe.co.il/wp-content/uploads/2021/06/cropped-logo1-1.png",
  },
  {
    url: "https://ayatamari.co.il/",
    title: "דף הבית - איה תמרי",
    imageUrl:
      "https://ayatamari.co.il/wp-content/uploads/2017/07/%D7%A8%D7%99%D7%91%D7%95%D7%A2-%D7%97%D7%93%D7%A9-%D7%9C%D7%90%D7%AA%D7%A8.jpg",
  },
  {
    url: "https://play.google.com/store/apps/details?id=com.ctconnect.galiltahton",
    title: "הגליל התחתון - Apps on Google Play",
    imageUrl:
      "https://play-lh.googleusercontent.com/T4AT4e_m_gui0qWFpU2TAjclTewhth2UjgmSGIrOspF8RkqW5BNmi9aJszf_QMnYaU0",
    position: positions.app,
  },
  {
    url: "http://www.lbl.co.il",
    title:
      "לייזרוביץ-ברק משרד עורכי דין | המשרד המוביל בישראל בתחום נזקי הגוף והביטוח!",
    imageUrl:
      "https://static.wixstatic.com/media/8d0ac9_bb78ae1c273e4a75a70d2eaf6ef1bc9a%7Emv2.png/v1/fit/w_2500,h_1330,al_c/8d0ac9_bb78ae1c273e4a75a70d2eaf6ef1bc9a%7Emv2.png",
  },
  {
    url: "https://drschein.com/",
    title: "ד״ר אופיר שיין: מנתח פלסטי מומחה לכירורגיה פלסטית",
    imageUrl: "https://drschein.com/wp-content/uploads/2021/09/Group-44.svg",
  },
  {
    url: "https://www.shaar-hatsafon.co.il/",
    title: "עמוד הבית - קניון המשפחות של הצפון - שער הצפון",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/he/1/10/%D7%A7%D7%A0%D7%99%D7%95%D7%9F_%D7%A9%D7%A2%D7%A8_%D7%94%D7%A6%D7%A4%D7%95%D7%9F.png",
  },
  {
    url: "https://www.candle-club.com/",
    title: "קנדל קלאב",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAFLoe4fqIeWlzCwgcrGXASr6LJkdSSviEqA&s",
  },
  {
    url: "https://havruta-huji.co.il/",
    title: "חברותא – בית מדרש לתלמידי האוניברסיטה",
    imageUrl:
      "https://havruta-huji.co.il/wp-content/uploads/2021/06/menu-open.svg",
  },
  {
    url: "http://www.tachlith.org.il",
    title: "תכלית - המכון למדיניות ישראלית",
    imageUrl:
      "https://static.wixstatic.com/media/d4d9e4_95a44cfa04c74e4788a17749f530cc8a%7Emv2.png/v1/fit/w_2500,h_1330,al_c/d4d9e4_95a44cfa04c74e4788a17749f530cc8a%7Emv2.png",
  },
  {
    url: "https://www.gezer-region.muni.il/",
    title: "מועצה אזורית גזר",
    imageUrl: "https://www.gezer-region.muni.il/content/images/fb.png",
  },
  {
    url: "https://www.ononet.co.il/",
    title: "אונו נט - חדשות קריית אונו\t\tאונו נט - חדשות קריית אונו",
    imageUrl:
      "https://www.ononet.co.il/wp-content/uploads/2022/11/logonewono.png",
  },
  {
    url: "https://getup.co.il/",
    title: "מדריך גירושין | מגזין גטUP מבית עורכת דין רות דיין-וולפנר",
    imageUrl:
      "https://getup.co.il/wp-content/uploads/sites/2/2021/07/1080x1080-%D7%A2%D7%95%D7%A8%D7%9B%D7%AA-%D7%93%D7%99%D7%9F-%D7%A8%D7%95%D7%AA-%D7%93%D7%99%D7%99%D7%9F-%D7%95%D7%95%D7%9C%D7%A4%D7%A0%D7%A8.jpg",
  },
  {
    url: "https://sites.google.com/tzfonet.org.il/dkalimhome/home?pli=1",
    title: "בית חינוך דקלים- חמדיה",
    imageUrl:
      "https://www.tentriko.co.il/wp-content/uploads/2021/02/%D7%AA%D7%9C%D7%91%D7%95%D7%A9%D7%AA-%D7%91%D7%99%D7%AA-%D7%A1%D7%A4%D7%A8-%D7%93%D7%A7%D7%9C%D7%99%D7%9D-%D7%97%D7%9E%D7%93%D7%99%D7%94-e1615209080399.jpg",
  },
  {
    url: "https://hanemala.com/",
    title:
      "הנמלה - רחל חלגואה I הורות, כתיבה ומה שביניהםכלי נגישותהגדל טקסטהקטן טקסטגווני אפורניגודיות גבוההניגודיות הפוכהרקע בהירהדגשת קישוריםפונט קריאאיפוס",
    imageUrl: "https://hanemala.com/wp-content/uploads/2023/01/home-bg.jpg",
  },
  {
    url: "https://www.odeliaclinic.com",
    title: "דף הבית | אודליה רפואה סינית לנשים ברחובות",
    imageUrl:
      "https://static.wixstatic.com/media/2db9b1_25cfc6bb3f464e229dfd9df7cedfbf4c%7Emv2.jpg/v1/fit/w_2500,h_1330,al_c/2db9b1_25cfc6bb3f464e229dfd9df7cedfbf4c%7Emv2.jpg",
  },
  {
    url: "https://www.kibbutz.org.il",
    title: "דף ראשי - אתר התנועה הקיבוצית | אתר התנועה הקיבוצית",
    imageUrl: "https://www.kibbutz.org.il/themes/kibbutzim/logo-n.png",
  },
  {
    url: "https://www.zivashamir.com/",
    title: "ראשי | מחקרים בספרות עברית",
    imageUrl:
      "https://static.wixstatic.com/media/c9eca8_edaf92bc1975412aaf2805d595d4bff6~mv2.png/v1/fill/w_772,h_521,al_c/c9eca8_edaf92bc1975412aaf2805d595d4bff6~mv2.png",
  },
  {
    url: "http://www.simplycreative.co.il",
    title: "Simply Creative | מרינה קיגל ויבגני סטופין",
    imageUrl:
      "https://static.wixstatic.com/media/3e9656_e969f48e974e4f60b57213608e0d8e45~mv2.png/v1/fill/w_1640,h_924,al_c/3e9656_e969f48e974e4f60b57213608e0d8e45~mv2.png",
  },
  {
    url: "https://www.kiryat-yam.muni.il/",
    title: "עיריית קריית ים",
    imageUrl: "https://www.kiryat-yam.muni.il/content/images/fb2.jpg",
  },
  {
    url: "https://tel-mond.muni.il/",
    title: "מועצה מקומית תל מונד",
    imageUrl: "https://tel-mond.muni.il/content/images/meta.png",
  },
  {
    url: "https://tzirim.co.il/",
    title: "מכשירי טנס ללידה והקלה על צירים ללידה קלה יותר | צירים",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ9CPgW_89A1ZImLBsXmGcI9hxRTqS3NZwpA&s",
  },
  {
    url: "https://www.kartzia.com/",
    title: "הקרציה מפולניה | הילה מיכוביץ סיטון | ניהול זמן בשיטת הנדנוד",
    imageUrl:
      "https://static.wixstatic.com/media/dc42bc_2b460b4fd38d4c6385a9eda2a805bf75~mv2.jpg/v1/fill/w_1598,h_851,al_c/dc42bc_2b460b4fd38d4c6385a9eda2a805bf75~mv2.jpg",
  },
  {
    url: "https://www.psagot.co.il/",
    title: "בית השקעות פסגות | חברת ההשקעות מהמובילות בתחום - פסגות בית השקעות",
    imageUrl:
      "https://www.psagot.co.il/wp-content/uploads/2024/05/android-chrome-512x512-1-150x150.png",
  },
  {
    url: "https://www.menashe.co.il/",
    title: "מועצה אזורית מנשה",
    imageUrl: "https://www.menashe.co.il/content/images/logo.png?v=1",
  },
  {
    url: "https://emek-maianot-region.muni.il/",
    title: "מועצה אזורית עמק המעיינות",
    imageUrl: "https://emek-maianot-region.muni.il/content/images/fb.png",
  },
  {
    url: "https://play.google.com/store/apps/details?id=com.maccabi.ewavemobile.maccabihealthservices",
    title: "מכבי בשבילי - Apps on Google Play",
    imageUrl:
      "https://play-lh.googleusercontent.com/kiaIN8Oir-e_CTRy0CQGEcKjYEgDsgNPnKZP2Yt6fBisg9ZqyTZoA6CJtmimb7KIr4U",
    position: positions.app,
  },
  {
    url: "http://www.linchpin.co.il",
    title: "בית - לינצ׳פין",
    imageUrl: "https://linchpin.co.il/wp-content/uploads/2024/02/1.jpg",
  },
  {
    url: "https://apps.apple.com/se/app/id814969508",
    title: "‎עמק המעיינות i App Store",
    imageUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple112/v4/e7/52/4c/e7524ce4-8eab-7868-fb5d-38e9e6f8d499/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/1200x630wa.png",
    position: positions.app,
  },
  {
    url: "https://apps.apple.com/il/app/id1115185358",
    title: "‎מכבי בשבילי on the App Store",
    imageUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/7e/6f/a2/7e6fa236-e427-a077-f28e-c4ec47c51351/AppIcon-1x_U007emarketing-0-7-0-85-220-0.png/1200x630wa.png",
  },
  {
    url: "https://www.mei-ziona.co.il/",
    title: "עמוד הבית - מי ציונה",
    imageUrl:
      "https://mei-ziona.co.il/wp-content/uploads/2023/07/logo-new-1.b197b0.webp",
  },
  {
    url: "http://www.ronityam.com",
    title:
      "תכשיטים בעיצוב אישי - חנות תכשיטים מעוצבים לרכישה אונליין - Ronit Yam",
    imageUrl: "https://www.ronityam.com/wp-content/uploads/2020/08/favicon.png",
  },
  {
    url: "https://www.saluteil.co.il/",
    title: "סאלוט - משחק שתיה עם קלפים לערב שלא תשכחו",
    imageUrl:
      "https://static.wixstatic.com/media/7d3169_1a3d7854d557409ba8b681b6c88b3fde%7Emv2.png/v1/fit/w_2500,h_1330,al_c/7d3169_1a3d7854d557409ba8b681b6c88b3fde%7Emv2.png",
  },
  {
    url: "https://play.google.com/store/apps/details?id=com.ctconnect.emekhmaianot",
    title: "עמק המעיינות - Apps on Google Play",
    imageUrl:
      "https://play-lh.googleusercontent.com/iavPqhHCGoW57YnsWEY6MOfNTIJ74b3xzCKy4AFVRPA3ZeY7vglIPCy6Fq9yZj9fMR4",
    position: positions.app,
  },
  {
    url: "http://www.ilanacahana.com",
    title:
      "אילנה כהנא- הוראה מותאמת בשפה ומתמטיקה  | הדרכת הורים | ADHD | אימון אינטגרטיבי",
    imageUrl:
      "https://static.wixstatic.com/media/58d643_0d48470b225b400fa65c6acb525af68e~mv2.png/v1/fill/w_500,h_500,al_c/58d643_0d48470b225b400fa65c6acb525af68e~mv2.png",
  },
  {
    url: "http://shop.mikibuganim.com",
    title: "מיקי בוגנים",
    imageUrl:
      "https://www.mikibuganim.com/wp-content/uploads/2021/08/%E2%80%8F%E2%80%8F%D7%9C%D7%9B%D7%99%D7%93%D7%94.png",
  },
  {
    url: "https://www.tammuz-music.com/",
    title: "תמוז זה מוזיקה | TAMMUZ MUSIC",
    imageUrl:
      "https://static.wixstatic.com/media/63e3ef_6de11a0fbda14192898bb6ba980c0911%7Emv2.png/v1/fit/w_2500,h_1330,al_c/63e3ef_6de11a0fbda14192898bb6ba980c0911%7Emv2.png",
  },
  {
    url: "https://www.harish.muni.il/",
    title: "דף הבית - עיריית חריש",
    imageUrl:
      "https://www.harish.muni.il/wp-content/uploads/2023/03/Horizontal-logo-on-white.png",
  },
  {
    url: "https://www.isiaesthetics.co.il/",
    title: "בית | ISI Aesthetics הדור הבא של טיפולי האסתטיקה | פתח תקווה",
    imageUrl:
      "https://static.wixstatic.com/shapes/687360_97a7e8efbe284aa1b8b63595517e7132.svg",
  },
  {
    url: "http://www.orenluxy.com",
    title: "לוקסי | אני כמעט תמיד רעב | בלוג המתכונים של השף אורן לוקסנבורג",
    imageUrl:
      "https://static.wixstatic.com/media/b77ca3_8cc60b208a3d41748f1b269b60b9e460%7Emv2.jpg/v1/fit/w_2500,h_1330,al_c/b77ca3_8cc60b208a3d41748f1b269b60b9e460%7Emv2.jpg",
  },
  {
    url: "https://www.kiryat-motzkin.muni.il/",
    title: "עיריית קריית מוצקין",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/he/thumb/6/60/Kiryat_Motzkin_-_New_Logo.png/240px-Kiryat_Motzkin_-_New_Logo.png",
  },
  {
    url: "https://neoraigenish748.wixsite.com/my-site-17",
    title:
      "אהבה  לבעלי מוגבלות | Wix Chat: מאפשר לחברים לשוחח זה עם זה באמצעות צ'אט חברי | Ashkelon",
    imageUrl:
      "https://static.wixstatic.com/media/c481e1_41498002d1314bb48e854d2d7369d1ff~mv2.jpg/v1/fill/w_8,h_7,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/c481e1_41498002d1314bb48e854d2d7369d1ff~mv2.jpg",
  },
  {
    url: "https://online.as-invest.co.il",
    title: "אזור אישי – אלטשולר שחם",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/he/thumb/b/be/%D7%90%D7%9C%D7%98%D7%A9%D7%95%D7%9C%D7%A8_%D7%A9%D7%97%D7%9D.png/190px-%D7%90%D7%9C%D7%98%D7%A9%D7%95%D7%9C%D7%A8_%D7%A9%D7%97%D7%9D.png",
  },
  {
    url: "https://tomelromjewls.com",
    title: "תום אלרום תכשיטים - tomelromjewls\n – תום אלרום - תכשיטי בוהו",
    imageUrl:
      "https://tomelromjewls.com/cdn/shop/files/slogan_logo.jpg?v=1629888714&width=150",
  },
  {
    url: "https://ramat-hasharon.muni.il/",
    title: "אתר עיריית רמת השרון - באת הביתה רמת השרון",
    imageUrl:
      "https://ramat-hasharon.muni.il/wp-content/uploads/2023/10/%D7%9B%D7%95%D7%9C%D7%A0%D7%95-%D7%99%D7%97%D7%93-%D7%97%D7%99%D7%A8%D7%95%D7%9D-1027x400-1.jpg",
  },
  {
    url: "https://www.pipiblogs.com/",
    title: "Pipiblogs | Israeli Eurovision Magazine | פיפיבלוגס",
    imageUrl:
      "https://static.wixstatic.com/media/bb8df4_268660cde597433ba61c971b136fea60%7Emv2.png/v1/fit/w_2500,h_1330,al_c/bb8df4_268660cde597433ba61c971b136fea60%7Emv2.png",
  },
  {
    url: "http://www.bonot.org",
    title: "בונות אלטרנטיבה- בונות מנהיגות לישראל",
    imageUrl:
      "https://static.wixstatic.com/media/feb26a_e78c0697ef50464aa7a7586f7b0b96b2~mv2.png/v1/fill/w_2500,h_2105,al_c/feb26a_e78c0697ef50464aa7a7586f7b0b96b2~mv2.png",
  },
  {
    url: "https://www.doralon.co.il/",
    title: "דף הבית | דור אלון",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/he/thumb/4/4f/Dor_Alon_Logo.svg/225px-Dor_Alon_Logo.svg.png",
  },
  {
    url: "https://cottonet.co.il/",
    title: "cotton כותון בגדי נשים - רשת אופנה ישראלית שמחמיאה לך",
    imageUrl: "https://cdn.cottonet.co.il/newsite/2024/12/4cd2e735-madein.jpg",
  },
  {
    url: "https://www.shabbatbli.com/",
    title: "דף הבית | Shabatbli",
    imageUrl:
      "https://static.wixstatic.com/media/4ba7ae_863e48b9a3ce4dda9585bf8e705ab203~mv2.png/v1/fill/w_102,h_102,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/%D7%A9%D7%91%D7%AA-%D7%91%D7%9C%D7%99_edited.png",
  },
  {
    url: "https://lumastudio.co.il/",
    title:
      "מיתוג, עיצוב בניית אתרים - LumaAccessibility ToolsIncrease TextDecrease TextGrayscaleHigh ContrastNegative ContrastLight BackgroundLinks UnderlineReadable FontReset",
    imageUrl:
      "https://lumastudio.co.il/wp-content/uploads/2024/11/Group-140-1-795x1024.png",
  },
  {
    url: "https://www.afula.muni.il/",
    title: "עיריית עפולה",
    imageUrl: "https://www.afula.muni.il/content/images/fb.png",
  },
  {
    url: "http://www.shir-teva.co.il",
    title:
      "רוקחות טבעית | ריפוי וטיפוח בדרך טבעית | חנות אונליין לשמנים צמחיים טבעיים",
    imageUrl: "https://shir-teva.co.il/wp-content/uploads/2021/06/logo.png",
  },
  {
    url: "https://argania-oil.co.il/",
    title: "ארגניה | מוצרי טיפוח לשיער ולעור | כל הטוב שיש לטבע להציע",
    imageUrl:
      "https://argania-oil.co.il/Content/Resources/Favicon/android-icon-192x192.png",
  },
  {
    url: "https://play.google.com/store/apps/details?id=com.wendi.ewave.tikshoov",
    title: "תקשובי - Apps on Google Play",
    imageUrl:
      "https://play-lh.googleusercontent.com/UbOyaWwoHqKUkhFxzy4FEkrAmQJmg70xaV4l3yeAtLHMygFdn7iBGL2Y_2SitC3OMHc",
    position: positions.app,
  },
  {
    url: "http://www.inbaltsur.co.il",
    title: "הדרכת הורים | ענבל צור תקשורת מקרבת במשפחה | ישראל",
    imageUrl:
      "https://static.wixstatic.com/media/013c73_e874bd65360f4860bd430b06f8b6c970~mv2.png/v1/fill/w_106,h_89,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/%D7%9C%D7%95%D7%92%D7%95__2_-removebg-preview.png",
  },
  {
    url: "https://www.wework.co.il",
    title: "WeWork Israel | וויוורק ישראל | משרדים וחללי עבודה",
    imageUrl:
      "https://static.wixstatic.com/media/9d12fd_996945f4f56a4b46b3a52fac3f016ea3~mv2.png/v1/fill/w_102,h_21,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/9d12fd_996945f4f56a4b46b3a52fac3f016ea3~mv2.png",
  },
  {
    url: "https://www.auroragifted.com/",
    title: "בית | אורורה",
    imageUrl:
      "https://static.wixstatic.com/media/1958d9_03f06970a5ee446f9249bfd24df3a4d3%7Emv2.png/v1/fit/w_2500,h_1330,al_c/1958d9_03f06970a5ee446f9249bfd24df3a4d3%7Emv2.png",
  },
  {
    url: "https://hadarmarketing.co.il/",
    title:
      "שיווק דיגיטלי לעסקים קטנים ובינוניים קידום אתרים פרסום והגדלת מכירות",
    imageUrl:
      "data:image/webp+xml;base64,UklGRhYHAABXRUJQVlA4WAoAAAAgAAAAlQAAlQAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggKAUAALAfAJ0BKpYAlgA+bTaWSKQjIiEiVJpQgA2JZW7hbxmwf3fiEOScQGkEcnf6r7Te0B5gH6p9IDzEftH6yvof9AD9ZOtV9ADy0/ZG/bP9gPaG1XPyP2Sf57IFuDYkBzc5HVcjPvJihmzT3XSWbTxy/4pj+W19DfyS/kAWZTXBV7K9RM6120V41C8Z54Vsg9ZC7Hcq8CdSKUzPpyTu22iOgcttDKYWU1/ayNVsLUbP0qTekUnY1f8dAnCtJobYwnFNQHXdfgQdI+76L98yZHTt5/WanEWhFZowv8LsptR5gXiDOLIar5CVIa5YtCFHsQWJ0DVGSLr6XChSizq39EYGr3XKB+XCQAAA/v8yPUaoJA9q91/0rbR9zWVrdbddF/r5c2qf//gxF9BOWN5m1JThLmP/rneq/q5/8kk+iX0IXqhYtsJKn+1VXSrfXcU+BDufUOqWSN/qW0d2Lq6e971DccN+2v8ibr8NMpA8usGHExb5LP0r1OO2m00zGnXKI991hb35MQdCuqf4an5uImpGWKSFFBjgjfFviXoAOSkXlSg//dXxKvmCp0q6VjkTm8lJV4ig6A9vzWI77CsC3EXXwEuOp9QnFClEtE28/UclHHQ6KhIhy4LcRvm6dwrl82l8DnoUJ8POY+enDgsRyFEzuRBU3BXWVVaZn3f0Pc8jVIMpLTOkcYluKlSlUDmJrjzP2kLdyqAHCBfftxLkubxT88cDcrqM6YbUp5y5TLM8XHQ0d1T2N2cHHaifGgjCJrlfbDq6E6TtbpjUM3eGEgGKdY/u0i3/EHg6bMV+hJ1Jl8oGTFcpMGzFPctCZLGxQxGc4LlllqITNNYdKYtaQihbKVuQ+X6eHjMpSC+2JXt+CBDdQx3XriOLkT3tdYv9X2ekio2n9eQNXq4eQhpummpiZS1wistWZ+mO6Re2fSMP5q6+y0xtIDSMUadBTDFpJUbXV1UTz9fH/033I1/ZAXu27aj9DHk5LgDmSlGkOEQKOP72lnkv755dbQfXs8b/Qrtml6bc1f2wO24NFdEFyY3GFJj4vZ33X8aiiTNzuLccjISIcbEtjwhzHS0PxzJFZiS/dT3TfLfXgfSsYCr4/cXdOSFnK75P1/UXHpm3spkd9kLP0VuCXCl9xJqxdHXx+H++fzHpLD521mMH0V9pLVt8J5ytTwEdj1m7Ozra369z40BPdaRPD/J5/xz9OdbBseDHJ05vYZ6HeV6TIDRyKjksrrKQ1YRhxFM6bskjY6v8PqCGbS/AcMhn7UIvgIqLvvXHI2DVO7FenZG/+c3v/uwfPhXVfuqp9wo9I8IbP/pyJ/R7TXSLCK0+A5fTOlf7/iHgx+GSTsdO04Raip+P8qztj2OZBuNG+vo22Bx1WK3/gVTlLm8a3Gar92TOhqRrchNfalmMbMWO2AwciFGwn1gdnwMZ/c/czXVRSmae5Ix0Aq9lHl4T4sFNphudL6y91y62GPP9l0fqSoqTHiU+yU829dHmYmR4/v1H6HbgaUVt8E3AtINRNyzNCSPfXNUj7UjqeH+kMjpxTgWvOo2Snv2Fi63fBIinJz3H34ClsWn+Ok/zFcRT5fUTxMqlspEyiHX1GQpT/wsIjQJoZFfqIezquV14IEhyGD3fFSPfWuV2alMQmfI4mgftjbiOVW4T8meu7JX4BEJBuqDCavIlervz9aMy/F5qiIHsbn0qxNpG9ZmaYe7zIHLd+s1NRBKxrELmegXLwBtn7qVA41WcYlSdUbu8ZOL1YAAAAA==",
  },
  {
    url: "https://www.drjerry.co.il/",
    title:
      "ד\"ר ג'רי כהן מרפאת שיניים בחולון | 50 שנות מצוינות | אליעזר הופיין 50, חולון",
    imageUrl:
      "https://www.drjerry.co.il/wp-content/uploads/2022/07/logo-04.png",
  },
  {
    url: "http://www.logicode.biz",
    title: "Logicode – פתרונות דיגיטליים מתקדמים: בניית אתרים ומערכות לעסקים",
    imageUrl:
      "https://logicode.biz/wp-content/uploads/2024/08/cropped-bullet-1-32x32.png",
  },
  {
    url: "https://www.hadhoritmagshima.com/",
    title: "אודות | Hadhoritmagshima הגשמה עצמאית",
    imageUrl:
      "https://static.wixstatic.com/media/3800e3_603cb90272504448896a6c813cdcaf62~mv2.png/v1/fill/w_940,h_788,al_c/3800e3_603cb90272504448896a6c813cdcaf62~mv2.png",
  },
  {
    url: "http://benphoenix.co.il",
    title: "עולם המיסטיקה של בן פניקס",
    imageUrl:
      "https://static.wixstatic.com/media/45f46d_7bdc3af16d6f43eda28800589e9fc60c~mv2.png/v1/fill/w_211,h_211,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/%D7%9C%D7%95%D7%92%D7%95%20-%20%D7%A2%D7%A5%20%D7%94%D7%97%D7%99%D7%99%D7%9D%20-%20%D7%A9%D7%A7%D7%95%D7%A3.png",
  },
  {
    url: "https://www.mazkeret-batya.muni.il/",
    title: "המועצה המקומית מזכרת בתיה",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/he/3/33/Mazkeret_Batya_COA.png",
  },
  {
    url: "https://www.little-pieces.co.il/",
    title: "ליטל פיסז | פרטי תיעוד מרגשים | Little Pieces",
    imageUrl:
      "https://static.wixstatic.com/media/615c49_bfd02c10719e4b5d831b98df570d8f95~mv2.jpg/v1/fill/w_2500,h_1406,al_c/615c49_bfd02c10719e4b5d831b98df570d8f95~mv2.jpg",
  },
  {
    url: "http://www.mspilpellet.com",
    title: "בית פלפלת, מרכז מטפלים לכל המשפחה | בית פלפלת | אבן יהודה",
    imageUrl:
      "https://static.wixstatic.com/media/0b5004_7d1f3ef3fb954929a3a9ef8e0a62b6cf~mv2.jpg/v1/fill/w_2500,h_966,al_c/0b5004_7d1f3ef3fb954929a3a9ef8e0a62b6cf~mv2.jpg",
  },
  {
    url: "https://www.wixmonster.co.il/",
    title: "בניית אתרים ב Wix | Wix Monster",
    imageUrl:
      "https://static.wixstatic.com/media/2b57d8_a1730ea0acba4402846f0e915a892414~mv2_d_2820_1496_s_2.png/v1/fill/w_2500,h_1326,al_c/2b57d8_a1730ea0acba4402846f0e915a892414~mv2_d_2820_1496_s_2.png",
  },
  {
    url: "https://co-impact.org.il/",
    title: "קו-אימפקט | מיזם לשילוב החברה הערבית בתעסוקה, בכלכלה ובחברה בישראל",
    imageUrl:
      "https://co-impact.org.il/wp-content/uploads/2020/07/Asset-26.png",
  },
  {
    url: "https://karmaschool.co.il/",
    title: "בית הספר לקארמה טובה - עורכת דין רות דיין-וולפנר | הפודקאסט",
    imageUrl:
      "https://karmaschool.co.il/wp-content/uploads/2021/08/RuthDayan-Podcast.jpeg",
  },
  {
    url: "https://www.ruthdayan.co.il/",
    title: "עורך דין גירושין, דיני משפחה, צוואות וירושות | משרד עו ד רות דיין",
    imageUrl:
      "https://www.ruthdayan.co.il/wp-content/uploads/2019/09/ruth-dayan-team-featured.jpg",
  },
  {
    url: "https://ruth-dayan.com/",
    title: "הבלוג של עוד רות דיין וולפנר - מיומנה של עורכת דין לענייני משפחה",
    imageUrl:
      "https://i0.wp.com/ruth-dayan.com/wp-content/uploads/2018/10/fav.jpg?fit=32%2C32&ssl=1",
  },
  {
    url: "https://karmaisabitch.co.il/",
    title: "קארמה איז א ביץ' וסיפורים אחרים | עו\"ד רות דיין-וולפנר",
    imageUrl: "https://karmaisabitch.co.il/wp-content/uploads/Book_desktop.png",
  },
  {
    url: "https://www.shirleyach.com/",
    title: "Home | Articles By Shirley Ach // שירלי אך",
    imageUrl:
      "https://static.wixstatic.com/media/652a16ffe33e4b73aec556d62cdaab1d.jpg/v1/fill/w_18,h_18,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/652a16ffe33e4b73aec556d62cdaab1d.jpg",
  },
  {
    url: "https://www.emekyizrael.org.il/",
    title: "מועצה אזורית עמק יזרעאל",
    imageUrl: "https://www.emekyizrael.org.il/content/images/logo_yello.png",
  },
  {
    url: "https://macom.org.il/",
    title:
      "אתר מקום | אתר לעזרה עצמית לנפגעי תקיפה מינית ואלימות בינאישית אחרת",
    imageUrl:
      "https://www.macom.org.il/wp-content/uploads/2014/02/macom-fb.jpg",
  },
  {
    url: "https://www.jce.ac.il/",
    title: "לימודי הנדסה - עזריאלי מכללה אקדמית להנדסה ירושלים",
    imageUrl: "https://www.jce.ac.il/wp-content/uploads/2023/12/1200-1200.png",
  },
  {
    url: "https://play.google.com/store/apps/details?id=com.nirpis.HilaLevyApp",
    title: "לחלום ולהגשים - Apps on Google Play",
    imageUrl:
      "https://play-lh.googleusercontent.com/TVu1SWRFhr12HNpOjEn7NVewxEObHBNveanzKOmGbqlA0W5C86PxgqOKO1Up4h1qRLc",
    position: positions.app,
  },
  {
    url: "https://apps.apple.com/il/app/id1548525596",
    title: "‎לחלום ולהגשים on the App Store",
    imageUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/b2/bb/7e/b2bb7ed6-c8c2-6b97-2a69-e89b04e15078/AppIcon-0-0-1x_U007epad-0-85-220.png/1200x630wa.png",
    position: positions.app,
  },
  {
    url: "https://play.google.com/store/apps/details?id=com.mosko.ravkav",
    title: "Rav-Kav by HopOn טעינת רב-קו - Apps on Google Play",
    imageUrl:
      "https://play-lh.googleusercontent.com/M6AeGAqfJL8J-ilglrYctKjubdtcyve3jEX-hHEN64CfkNDuXwv_bJWnVnvUvoZKsQA",
    position: positions.app,
  },
  {
    url: "https://ravkavonline.co.il",
    title:
      "רב-קו אונליין | השירות הרשמי למכירה וטעינה של חוזי נסיעה לרב-קו רב-קו אונליין",
    imageUrl:
      "https://ravkavonline.co.il/static/assets/images/ravkavonline-cover.77e856a27421.png",
  },
  {
    url: "https://apps.apple.com/app/apple-store/id1468252492",
    title: "‎Rav-Kav Online רב-קו אונליין on the App Store",
    imageUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/65/ef/a5/65efa536-8fcc-37eb-f39f-59b577acfd56/AppIcon-1x_U007emarketing-0-10-0-0-85-220.png/1200x630wa.png",
  },
  {
    url: "https://www.yooletta.com",
    title: "Yooletta | יולטה - גן עדן לאוהבי נייר",
    imageUrl:
      "http://www.yooletta.com/cdn/shop/files/yoolettalogo-01.png?v=1613514227",
  },
  {
    url: "http://Arielli.co.il",
    title: "עמוד הבית | Arielli",
    imageUrl:
      "https://static.wixstatic.com/media/845cd7_739aa8717d4b418884b2bafd57584a49~mv2.png/v1/fill/w_165,h_56,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Logo.png",
  },
  {
    url: "https://www.yummi.co.il",
    title: "יאמי - אנשים מבשלים לאנשים - יאמי",
    imageUrl: "https://www.yummi.co.il/yummi.ico?v=1",
  },
  {
    url: "https://www.ariel.muni.il/",
    title: "עיריית אריאל",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Coat_of_arms_of_Ariel.svg/225px-Coat_of_arms_of_Ariel.svg.png",
  },
  {
    url: "https://www.hof-hacarmel.co.il/",
    title: "מועצה אזורית חוף הכרמל",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/he/5/58/Hof_HaCarmel_Regional_Council_COA.png",
  },
  {
    url: "https://www.hviil.shop/",
    title: "בית | HVI Store",
    imageUrl:
      "https://static.wixstatic.com/media/d4063e_cfe26081354b45b8839ef26632d724b0%7Emv2.png/v1/fit/w_2500,h_1330,al_c/d4063e_cfe26081354b45b8839ef26632d724b0%7Emv2.png",
  },
  {
    url: "https://www.lulupolaroid.com/",
    title: "פיתוח תמונות | Lulu - פיתוח תמונות פולארויד מקורי | Israel",
    imageUrl:
      "https://static.wixstatic.com/media/296f93_818a4a9ed98d47c8bd4cd91346255c6c~mv2.jpg/v1/fill/w_2500,h_1667,al_c/296f93_818a4a9ed98d47c8bd4cd91346255c6c~mv2.jpg",
  },
  {
    url: "https://www.bonot.org/",
    title: "בונות אלטרנטיבה- בונות מנהיגות לישראל",
    imageUrl:
      "https://static.wixstatic.com/media/feb26a_e78c0697ef50464aa7a7586f7b0b96b2~mv2.png/v1/fill/w_2500,h_2105,al_c/feb26a_e78c0697ef50464aa7a7586f7b0b96b2~mv2.png",
  },
  {
    url: "http://healthyclick.co.il",
    title: "בריאות בקליק - מצאו את הטיפול שלכם בקליק",
    imageUrl:
      "https://www.healthyclick.co.il/wp-content/uploads/2022/01/%D7%91%D7%A8%D7%99%D7%90%D7%95%D7%AA-%D7%91%D7%A7%D7%9C%D7%99%D7%A7-%D7%9C%D7%95%D7%92%D7%95-%D7%A7%D7%98%D7%9F-%D7%A8%D7%A7%D7%A2-%D7%9C%D7%91%D7%9F.png",
  },
  {
    url: "https://dhlsimple.co.il/marketing-dhl/",
    title: "Marketing-DHL – DHLsimple",
    imageUrl: "https://dhlsimple.co.il/wp-content/uploads/2019/08/logo.svg",
  },

  {
    url: "https://play.google.com/store/apps/details?id=com.wendi.EmployeePlus",
    title: "U360 - Apps on Google Play",
    imageUrl:
      "https://play-lh.googleusercontent.com/_g6t5T-741D0o8KMexNTaxoKZmpK4MAE0SDTNpbsR1UNXy-rTDUpJeYATS_8XddR7UI",
    position: positions.app,
  },
  {
    url: "https://www.commbox.io/",
    title: "CommBox - AI Omnichannel Customer Experience Platform",
    imageUrl:
      "https://www.commbox.io/wp-content/uploads/2023/11/CommBox-black-logo.png",
  },
  {
    url: "http://Babcom.com",
    title: "HOME - Babcom",
    imageUrl:
      "https://babcomcenters.com//wp-content/uploads/2018/07/FINAL-LOGO_babcom_matrix.png",
  },
  {
    url: "http://www.yra-makeover.com",
    title: "yra-makeover.com\n – YRA Makeover",
    imageUrl:
      "http://yra-makeover.com/cdn/shop/files/yra_link_logo.jpg?v=1632901364",
  },
  {
    url: "https://tomdaminhavida.wixsite.com/my-site",
    title: "INÍCIO | My Site",
    imageUrl: "https://www.wix.com/favicon.ico",
  },
  {
    url: "https://nwisabaris.wixsite.com/home",
    title: "Home | Samuel",
    imageUrl:
      "https://static.wixstatic.com/media/ad9e5d_ca8e3af9c749486591d41e6b2a2c3da2~mv2.jpg/v1/crop/x_1,y_0,w_319,h_319/fill/w_57,h_57,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/sam%20pix_edited_edited_edited.jpg",
  },
  {
    url: "https://www.fcmbridgeton.com/",
    title: "Church | Fcm - Bridgeton | Bridgeton",
    imageUrl:
      "https://static.wixstatic.com/media/11062b_4b7c9a8e48334d5aad2fd274fddba3bc~mv2.jpg/v1/fill/w_288,h_192,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/11062b_4b7c9a8e48334d5aad2fd274fddba3bc~mv2.jpg",
  },
  {
    url: "https://www.nonacook.com/",
    title: "Nonacook | Nonacook.com",
    imageUrl:
      "https://static.wixstatic.com/media/62e41b_42acfcbeb9fb46a5ab320dcc3f8cd603~mv2.png/v1/fill/w_230,h_230,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/%D7%9E%D7%AA%D7%9B%D7%95%D7%A0%D7%99%D7%9D%20%D7%9E%D7%91%D7%99%D7%AA%20%D7%A1%D7%91%D7%AA%D7%90%20%D7%99%D7%95%D7%9B%D7%91%D7%93%20(2).png",
  },
  {
    url: "https://www.visionplusconsultancy.com/",
    title: "Home | VPC",
    imageUrl:
      "https://static.wixstatic.com/media/fc7258_5f37922788d54fafbe0ea43554738ee4%7Emv2.png/v1/fit/w_2500,h_1330,al_c/fc7258_5f37922788d54fafbe0ea43554738ee4%7Emv2.png",
  },
  {
    url: "https://www.lumieredelutecia.com/",
    title: "Sophrologue en Vendée | Essayez la sophrologie",
    imageUrl:
      "https://local-fr-public.s3.eu-west-3.amazonaws.com/prod/webtool/bundles/webtoolcore/favicon/favicon_localfr.ico",
  },
  {
    url: "https://www.firstcontactuk.org/",
    title: "First Contact UK Mental Health | Training Services",
    imageUrl:
      "https://static.wixstatic.com/media/903a30_d65d99cde0ef419b8f693bb54c1aa08b~mv2.png/v1/fill/w_130,h_130,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/First%20Contact%20UK%20Logo.png",
  },
  {
    url: "https://www.trillium-montessori.com/",
    title:
      "Trillium Bilingual Montessori | childcare | 4195 King Street East, Kitchener, ON, Canada",
    imageUrl:
      "https://static.wixstatic.com/media/a7c5c9_f89bf2b21b5e48989791bd1e9bbf7af8%7Emv2.png/v1/fit/w_2500,h_1330,al_c/a7c5c9_f89bf2b21b5e48989791bd1e9bbf7af8%7Emv2.png",
  },
  {
    url: "https://www.athometherapyservices.com/",
    title:
      "Virtual Therapy in North Dakota & Minnesota | At Home Therapy Services",
    imageUrl:
      "https://static.wixstatic.com/media/927efc_f713f0874256426aa4badd2885be916b~mv2.png/v1/fill/w_679,h_408,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/customcolor_logo_transparent_background%20pinkv2.png",
  },
  {
    url: "https://www.pokertishi.com/",
    title: "Home | PokerTishi",
    imageUrl:
      "https://static.wixstatic.com/media/882ac0_7aa714657743417b981a072b1f33349e%7Emv2.jpg/v1/fit/w_2500,h_1330,al_c/882ac0_7aa714657743417b981a072b1f33349e%7Emv2.jpg",
  },
  {
    url: "https://www.onlywhatiwatch.com/",
    title: "Film Reviews & Thoughts  | Onlywhatiwatch",
    imageUrl:
      "https://static.wixstatic.com/media/e55fa2_f819895555d6407eace8cdb0a4ac4a70~mv2.png/v1/fill/w_940,h_520,al_c/e55fa2_f819895555d6407eace8cdb0a4ac4a70~mv2.png",
  },
  {
    url: "http://cbtist.co.il/",
    title: "WinCBT - WinCBT",
    imageUrl: "https://cbtist.co.il/wp-content/uploads/2022/10/rubicon.png",
  },
  {
    url: "https://www.randomspix.com/",
    title:
      "#RandomSpix - Spiritual Awakening & Enlightenment & Knowledge @random",
    imageUrl:
      "https://static.wixstatic.com/media/4e0916_f8bd1540ba934d5f93aa811ad50e5a44%7Emv2.png/v1/fit/w_2500,h_1330,al_c/4e0916_f8bd1540ba934d5f93aa811ad50e5a44%7Emv2.png",
  },
  {
    url: "https://www.pscrochet.design/",
    title: "Home | Personal Spell Crochet",
    imageUrl:
      "https://static.wixstatic.com/media/84560d_2a3841b7c92a49ceb1a55ec297cde2a0%7Emv2.png/v1/fill/w_192%2Ch_192%2Clg_1%2Cusm_0.66_1.00_0.01/84560d_2a3841b7c92a49ceb1a55ec297cde2a0%7Emv2.png",
  },
  {
    url: "https://www.teatokliz.com/",
    title: "Home | BöN",
    imageUrl: "https://static.parastorage.com/client/pfavico.ico",
  },
  {
    url: "https://www.techniquesnow.com/",
    title: "Home | Techniques Now Productivity",
    imageUrl: "https://static.parastorage.com/client/pfavico.ico",
  },
  {
    url: "https://www.natacoachingstudio.com/",
    title: "Architecture Entrance Exam | Nata Coaching Center",
    imageUrl: "https://static.parastorage.com/client/pfavico.ico",
  },
  {
    url: "https://www.sonicparlor13.com/",
    title: "SonicParlor13 | Become your disruption! Show your disruption!",
    imageUrl:
      "https://static.wixstatic.com/media/7b1681_853815197cd5493f838bfe78494413ae~mv2.jpg/v1/fill/w_336,h_87,al_c,lg_1,q_80,enc_avif,quality_auto/SP13-Logo-2015_wix.jpg",
  },
  {
    url: "https://www.spillthateawithdee.com/",
    title:
      "Relationship And Individual Counseling Build Yourself. | Spillthateawithdee",
    imageUrl:
      "https://static.wixstatic.com/media/ff2445_ad5f351a4b744f598fe8446f9fd864d0%7Emv2.jpg/v1/fit/w_2500,h_1330,al_c/ff2445_ad5f351a4b744f598fe8446f9fd864d0%7Emv2.jpg",
  },
  {
    url: "https://www.teachingtruthtoday.com/",
    title:
      "Discipleship Training International Ministry | Teaching Truth Today",
    imageUrl:
      "https://static.wixstatic.com/media/7169f4_e8dd5f1242ac40dbb0e20fecf9e8ce90%7Emv2.jpg/v1/fit/w_2500,h_1330,al_c/7169f4_e8dd5f1242ac40dbb0e20fecf9e8ce90%7Emv2.jpg",
  },
  {
    url: "https://www.kohinoorhomedecor.com/",
    title: "Home - KOHINOOR Google Reviews ",
    imageUrl:
      "https://kohinoorhomedecor.com/wp-content/uploads/2023/06/Untitled1.png",
  },
  {
    url: "https://www.healthmst.com/",
    title:
      "Health Medical Supplies And Trading | medical health | 4th Floor Building Street 86 Street 340, doha qatar",
    imageUrl: "https://static.parastorage.com/client/pfavico.ico",
  },
  {
    url: "https://www.soldieroflovefoundation.org/",
    title:
      "Domestic Violence  Organization | Soldier Of Love Foundation Inc. | Philadelphia",
    imageUrl:
      "https://static.wixstatic.com/media/224cc5_ccbeaaa35035466b90c80b8e34712ca2%7Emv2.jpg/v1/fit/w_2500,h_1330,al_c/224cc5_ccbeaaa35035466b90c80b8e34712ca2%7Emv2.jpg",
  },
  {
    url: "https://www.luckyscharm.blog/",
    title: "Blog | Lucky's Charm",
    imageUrl:
      "https://static.wixstatic.com/media/d8ddec_c3f29051395541e6a61c25da6e11459a%7Emv2.png/v1/fit/w_2500,h_1330,al_c/d8ddec_c3f29051395541e6a61c25da6e11459a%7Emv2.png",
  },
  {
    url: "http://wowww.co.il/",
    title: "Wowww – Wowww by smartix",
    imageUrl:
      "https://wowww.co.il/wp-content/uploads/2020/08/cropped-אייקון-32x32.png",
  },
  {
    url: "https://www.purple-pinecone.ca/",
    title: "Quick Shop | purple pinecone",
    imageUrl:
      "https://static.wixstatic.com/media/a7c5c9_283fd4a8da9b427baadd24a89f6c845c%7Emv2.png/v1/fit/w_2500,h_1330,al_c/a7c5c9_283fd4a8da9b427baadd24a89f6c845c%7Emv2.png",
  },
  {
    url: "https://www.alona.org.il/",
    title: "https://www.alona.org.il/",
    imageUrl: "https://www.alona.org.il/content/images/facebook.png?v=4",
  },
  {
    url: "https://www.sparkling-sprite.com/",
    title: "Streamer | Sparkling Sprite",
    imageUrl:
      "https://static.wixstatic.com/media/11062b_4b7c9a8e48334d5aad2fd274fddba3bc~mv2.jpg/v1/fill/w_288,h_192,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/11062b_4b7c9a8e48334d5aad2fd274fddba3bc~mv2.jpg",
  },
  {
    url: "https://www.angelz.store/",
    title: "Angelz Spiritual Store| Gems, Stones many products",
    imageUrl:
      "https://static.wixstatic.com/media/0f2470_37f0171f6ded48d991ab9b1de16da893%7Emv2.png/v1/fit/w_2500,h_1330,al_c/0f2470_37f0171f6ded48d991ab9b1de16da893%7Emv2.png",
  },
  {
    url: "https://punkidsandrebels.com/",
    title: "https://punkidsandrebels.com/",
    imageUrl:
      "https://cdn.cashcow.co.il/media-gallery/6CTQyIz__Hg%3d/LOGO02.jpg",
  },
  {
    url: "https://www.nonviolentiam.org/",
    title: "Nonviolentiam | Domestic abuse victims | Birmingham, UK",
    imageUrl:
      "https://static.wixstatic.com/media/82654f_4b585044380440c09ac607896ddfb864%7Emv2.png/v1/fit/w_2500,h_1330,al_c/82654f_4b585044380440c09ac607896ddfb864%7Emv2.png",
  },
  {
    url: "https://www.crisalida.org/",
    title: "Trauma Informed Care | Crisalida, Inc. | Colorado Springs",
    imageUrl:
      "https://static.wixstatic.com/media/11062b_00067cf291384ba5a55c57dad411ba78~mv2.jpg/v1/fill/w_50,h_33,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/11062b_00067cf291384ba5a55c57dad411ba78~mv2.jpg",
  },
  {
    url: "https://www.theskywithnolimits.com/",
    title: "Blog | The Sky With No Limits",
    imageUrl:
      "https://static.wixstatic.com/media/2f1ae4_55a0d240f5e446059f342756b746f33f%7Emv2.jpeg/v1/fit/w_2500,h_1330,al_c/2f1ae4_55a0d240f5e446059f342756b746f33f%7Emv2.jpeg",
  },
  {
    url: "http://www.a2lab.jp/",
    title: "A2lab | 英語教育コンサルティング",
    imageUrl:
      "https://static.wixstatic.com/media/60a682_25831167687d4a07b64d4271bdb57708~mv2.jpg/v1/fill/w_400,h_225,al_c/60a682_25831167687d4a07b64d4271bdb57708~mv2.jpg",
  },
  {
    url: "https://myinspire.co.il/",
    title: "myinspire - Myinspire",
    imageUrl:
      "https://myinspire.co.il/wp-content/uploads/2022/02/myinspire-02.png",
  },
  {
    url: "https://play.google.com/store/apps/details?id=com.ichilov",
    title: "Ichilov - Apps on Google Play",
    imageUrl:
      "https://play-lh.googleusercontent.com/F7nPS9h8Y8-gNiQv9L-RXTlEvQknxWruLHFiORELs6yOZSIXXQcD2tYQWjoJRwh3Nw=w240-h480-rw",
    position: positions.app,
  },
  {
    url: "https://apps.apple.com/il/app/mekome/id989765881",
    title: "‎Mekome on the App Store",
    imageUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/8a/27/81/8a2781a0-335d-47ae-c654-9281d1442ac2/AppIcon-0-0-1x_U007emarketing-0-7-0-0-85-220.png/1200x630wa.png",
  },
  {
    url: "https://www.wowhpc.com/",
    title: "Hyderabad Party Club I Network,Connect and Celebrate",
    imageUrl:
      "https://static.wixstatic.com/media/eb8ec3_70b79aeb01db43b8a8c31c9544d444de%7Emv2.jpg/v1/fit/w_2500,h_1330,al_c/eb8ec3_70b79aeb01db43b8a8c31c9544d444de%7Emv2.jpg",
  },
  {
    url: "https://Avinoam7.com",
    title:
      "Follow Your Art.Accessibility ToolsIncrease TextDecrease TextGrayscaleHigh ContrastNegative ContrastLight BackgroundLinks UnderlineReadable FontReset",
    imageUrl: "https://avinoam7.com/wp-content/uploads/2024/02/AM_DESIGN6.png",
  },
  {
    url: "https://www.somethingfromindia.com/",
    title: "https://www.somethingfromindia.com/",
    imageUrl:
      "https://cdn.cashcow.co.il/media-gallery/GNkutYzwqVk%3d/logo%20black.jpg",
  },
  {
    url: "https://www.keyconnectionscoaching.com/",
    title: "Effective Communications | Key Connections Coaching | Wentzville",
    imageUrl:
      "https://static.wixstatic.com/media/9f9958_1d4389f9c3ec4c3f89947ffc47990ffd%7Emv2.jpg/v1/fit/w_2500,h_1330,al_c/9f9958_1d4389f9c3ec4c3f89947ffc47990ffd%7Emv2.jpg",
  },
  {
    url: "https://www.explainstudio.dev/",
    title: "Home | EXPLAIN",
    imageUrl:
      "https://static.wixstatic.com/media/ffd607_6c118515cf6b46ce81b947d87826db36%7Emv2.png/v1/fill/w_192%2Ch_192%2Clg_1%2Cusm_0.66_1.00_0.01/ffd607_6c118515cf6b46ce81b947d87826db36%7Emv2.png",
  },
  {
    url: "https://www.thedewyskin.com/",
    title: "Thedewyskin",
    imageUrl:
      "https://thedewyskin.com/cdn/shop/files/icon_fav.png?crop=center&height=32&v=1723974757&width=32",
  },
  {
    url: "https://www.daevionsplace.org/",
    title: "Dae'Vion's Place of Resilience | Gun Violence",
    imageUrl:
      "https://static.wixstatic.com/media/7ea02b_0d7abe182c664db1948dea345372a4df~mv2.png/v1/fill/w_1280,h_720,al_c/7ea02b_0d7abe182c664db1948dea345372a4df~mv2.png",
  },
  {
    url: "https://www.lepren.net/",
    title: "Home | contemp-artist-store",
    imageUrl: "https://static.parastorage.com/client/pfavico.ico",
  },
  {
    url: "https://www.aestheticawichita.com/",
    title: "Home | Aesthetica",
    imageUrl:
      "https://static.wixstatic.com/media/9b4eff_888e08710a174f78b8970ecfaafb23df~mv2.png/v1/crop/x_331,y_432,w_891,h_399/fill/w_230,h_103,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/logo%20text%20only-2.png",
  },
  {
    url: "https://www.majikfirearms.com/",
    title:
      "Federal Firearms Transfers FFL | Majik Firearms and Training | Rockdale",
    imageUrl:
      "https://static.wixstatic.com/media/e4062e_31e0b97aafd740bd9b5e8674f5038597%7Emv2.png/v1/fit/w_2500,h_1330,al_c/e4062e_31e0b97aafd740bd9b5e8674f5038597%7Emv2.png",
  },
  {
    url: "https://takahashi-di.wixsite.com/division-of-biochemi",
    title: "Home | Hase Lab (DBC)",
    imageUrl:
      "https://static.wixstatic.com/media/dc5f2b_a8b87c707e984100bea58c50b4ee2d07~mv2.jpg/v1/fill/w_288,h_216,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/dc5f2b_a8b87c707e984100bea58c50b4ee2d07~mv2.jpg",
  },
  {
    url: "https://www.prayerpartner247.com/",
    title: "247 prayer line | 24/7 Prayer | Prayer Partner 247",
    imageUrl:
      "https://static.wixstatic.com/media/642657_bbc6cd0b2b21417abbb79793790cb5e3%7Emv2.png/v1/fit/w_2500,h_1330,al_c/642657_bbc6cd0b2b21417abbb79793790cb5e3%7Emv2.png",
  },
  {
    url: "https://www.autumnisobelsmith.com/",
    title: "Home | autumnisobelsmith writing",
    imageUrl:
      "https://static.wixstatic.com/media/6a1cfe_e2f38be308ee4cce9933240568219198%7Emv2.png/v1/fit/w_2500,h_1330,al_c/6a1cfe_e2f38be308ee4cce9933240568219198%7Emv2.png",
  },
  {
    url: "https://www.qover878.com/",
    title: "E Commerce Multi Store | Q_over",
    imageUrl:
      "https://static.wixstatic.com/media/c57353_dfe541a29c054675b6803334d6603181%7Emv2.png/v1/fit/w_2500,h_1330,al_c/c57353_dfe541a29c054675b6803334d6603181%7Emv2.png",
  },
  {
    url: "https://www.landscape333.tokyo/",
    title:
      "landscape333 Tokyo - 合同会社ランドスケープ｜LANDSCAPE.LLC｜撮影｜空撮｜Webデザイン｜NFT｜AI",
    imageUrl:
      "https://static.wixstatic.com/media/5cab23_a081efbbb8324baa86d8bf16f971fcb8~mv2.png/v1/fill/w_2460,h_936,al_c/5cab23_a081efbbb8324baa86d8bf16f971fcb8~mv2.png",
  },
  {
    url: "https://play.google.com/store/apps/details?id=com.crmc.pardeshannakarkur",
    title: "pardes hanna karkur - Apps on Google Play",
    imageUrl:
      "https://play-lh.googleusercontent.com/pagCEJyfFdXACiI3BFBTW4sTi8WEaPsLzDoOCyjugDSbz5nCHah9WIZ6zw_j2rqNQTM",
    position: positions.app,
  },
  {
    url: "https://www.noey.eu/",
    title:
      "Noey | Mindfully curated. Loja para criança, bebé e para toda a família. Prendas, brinquedos e roupa com foco no sustentável. Kids. Baby. Maternity. Wellness. Independent brands. Sustainability.",
    imageUrl:
      "https://static.wixstatic.com/media/396dd4_2ffddcfd27a14297aa9bdc5e10041486%7Emv2.png/v1/fill/w_192%2Ch_192%2Clg_1%2Cusm_0.66_1.00_0.01/396dd4_2ffddcfd27a14297aa9bdc5e10041486%7Emv2.png",
  },
  {
    url: "https://www.solswritehouse.com/",
    title: "Life & Love after Divorce & Grief",
    imageUrl:
      "https://static.wixstatic.com/media/3f9822_46390e809faf423fbb589d5d0b5e891d~mv2.png/v1/fill/w_2500,h_2500,al_c/3f9822_46390e809faf423fbb589d5d0b5e891d~mv2.png",
  },
  {
    url: "https://www.glancestop.com/",
    title: "Gwalior | Glancestop | Gwalior",
    imageUrl:
      "https://static.wixstatic.com/media/b6870c_85b53b36c0354e0db7a9d132ce05aba2%7Emv2.jpg/v1/fit/w_2500,h_1330,al_c/b6870c_85b53b36c0354e0db7a9d132ce05aba2%7Emv2.jpg",
  },
  {
    url: "https://angelicafenderson.wixsite.com/the-enchanted-butter",
    title: "HOME | Enchanted Butterfly",
    imageUrl:
      "https://static.wixstatic.com/media/nsplsh_346b456f62507150674b77~mv2_d_6000_4000_s_4_2.jpg/v1/crop/x_377,y_634,w_5526,h_3366/fill/w_967,h_589,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Image%20by%20Sian%20Cooper.jpg",
  },
  {
    url: "http://www.divinelifetribe.com/",
    title: "HOME | DIVINE LIFE TRIBE",
    imageUrl:
      "https://static.wixstatic.com/media/b4755888d23c406082953b258d05ebeb.jpg/v1/fit/w_2500,h_1330,al_c/b4755888d23c406082953b258d05ebeb.jpg",
  },

  {
    url: "https://www.stemartmontessori.com/",
    title: "Home | STEMArt Montessori",
    imageUrl:
      "https://static.wixstatic.com/media/a7c5c9_5091f310d7b74d9b9ae88522fb1797ae%7Emv2.png/v1/fit/w_2500,h_1330,al_c/a7c5c9_5091f310d7b74d9b9ae88522fb1797ae%7Emv2.png",
  },
  {
    url: "https://www.ksquaremagazine.com/",
    title: "K. Obsessed | K-pop, K-drama, K-everything",
    imageUrl: "https://static.parastorage.com/client/pfavico.ico",
  },

  {
    url: "https://www.familysafetynetwork.org/",
    title:
      "Advocates For Victims Of Domestic Violence | Family Safety Network | Driggs",
    imageUrl:
      "https://static.wixstatic.com/media/787b1f_583a24e3d58d4e3ba8fe68ffe488a17d~mv2.png/v1/fill/w_306,h_73,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/fsn-logo-primary-prp_2048x488.png",
  },
  {
    url: "https://www.socialgraam.in/",
    title: "Socialgraam | Social Media Marketing Agency | Chandigarh",
    imageUrl:
      "https://static.wixstatic.com/media/c1e557_8979e0338bd14328bf5a345d096bd98d%7Emv2.png/v1/fit/w_2500,h_1330,al_c/c1e557_8979e0338bd14328bf5a345d096bd98d%7Emv2.png",
  },
  {
    url: "https://atuerk3.wixsite.com/hamburgs-insider-ort",
    title: "HOME | Hamburgs Insider Ort",
    imageUrl:
      "https://static.wixstatic.com/media/9de721_8f263a990d7c489589eec8fee8350bc2~mv2.png/v1/crop/x_335,y_177,w_275,h_284/fill/w_263,h_275,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Logo%20weiss_transprarent.png",
  },
  {
    url: "https://www.empowerlawassociates.com/",
    title:
      "Home | EMPOWER LAW ASSOCIATES | lawyers & counselors | Jungpura Extension, Jungpura, New Delhi, Delhi 110014, India",
    imageUrl: "https://static.parastorage.com/client/pfavico.ico",
  },
  {
    url: "https://www.bootsandbucklesboutique.com/",
    title: "https://www.bootsandbucklesboutique.com/",
    imageUrl: "",
  },
  {
    url: "https://play.google.com/store/apps/details?id=com.grouphug.grouphug",
    title: "GroupHug - Apps on Google Play",
    imageUrl:
      "https://play-lh.googleusercontent.com/lbZOAk8euMbBKZKhWKVpzc8uwpIeA1xyLtNDjN-lkpti72OYNzFbJzmRsL9JlNsAw1U",
    position: positions.app,
  },
  {
    url: "https://apps.apple.com/il/app/grouphug/id6443481916",
    title: "GroupHug on the App Store",
    imageUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/fe/31/67/fe31672a-6131-8018-fa2a-bc472d4e7adc/AppIcon-0-0-1x_U007emarketing-0-10-0-85-220.png/1200x630wa.png",
  },
  {
    url: "https://www.rightglance.com/",
    title: "Interesting Informative Blogs | Right Glance ",
    imageUrl: "https://static.parastorage.com/client/pfavico.ico",
  },
  {
    url: "https://apps.apple.com/il/app/u360/id1517973450",
    title: "‎U360 on the App Store",
    imageUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/99/e5/ab/99e5ab7f-0d67-7299-7a84-726edcadd5e0/AppIcon-1x_U007emarketing-0-7-0-85-220-0.png/1200x630wa.png",
  },
  {
    url: "https://www.liberosex.com/",
    title: "Libero Sex Academy | empoderamiento femenino",
    imageUrl:
      "https://static.wixstatic.com/media/5ae475_c81bacb727d4470082179a147b87cf1a~mv2.png/v1/fill/w_1190,h_1156,al_c/5ae475_c81bacb727d4470082179a147b87cf1a~mv2.png",
  },
  {
    url: "https://www.liatshaked.com/",
    title: "HOME | Liat Shaked Creative",
    imageUrl:
      "https://static.wixstatic.com/media/feae53_d13c354599af4c7f97d65fb4b5f43049%7Emv2.png/v1/fit/w_2500,h_1330,al_c/feae53_d13c354599af4c7f97d65fb4b5f43049%7Emv2.png",
  },
  {
    url: "https://www.luxekitchensglasgow.co.uk/",
    title: "Kitchen Design | Luxe Kitchens | Scotland",
    imageUrl:
      "https://static.wixstatic.com/media/8698a9_eac4a1eddef34681969f74b3cba0bfd0~mv2.png/v1/fill/w_2500,h_2500,al_c/8698a9_eac4a1eddef34681969f74b3cba0bfd0~mv2.png",
  },
  {
    url: "https://www.diamondsmaid.co.uk/",
    title: "House Cleaning Services Aylesbury| Diamond Maids",
    imageUrl:
      "https://static.wixstatic.com/media/892863_3ffffca6b49444baabca46153b3ef665%7Emv2.png/v1/fit/w_2500,h_1330,al_c/892863_3ffffca6b49444baabca46153b3ef665%7Emv2.png",
  },
  {
    url: "https://www.kaashni.co.in/",
    title:
      "Kaashni | Furniture Hardware | Kaashni Hardwaress, Mysore Road, Raghava Nagar,  Telecom Layout, Bengaluru, Karnataka, India",
    imageUrl:
      "https://static.wixstatic.com/media/dc8280_37409146cf3747baa01d6b45a61f70fc%7Emv2.jpg/v1/fit/w_2500,h_1330,al_c/dc8280_37409146cf3747baa01d6b45a61f70fc%7Emv2.jpg",
  },
  {
    url: "http://www.seeit-art.com",
    title: "See it - See it",
    imageUrl:
      "https://seeit-art.com/wp-content/uploads/2020/12/web_icon-100x100.png",
  },
  {
    url: "https://www.anas76.com/",
    title: "ANAS76.COM | بوابة الفنون الإلكترونية | Baghdad, Iraq",
    imageUrl:
      "https://static.wixstatic.com/media/594a3f_b86245e397d84a2fbde2aad25b99c2c4%7Emv2.jpg/v1/fit/w_2500,h_1330,al_c/594a3f_b86245e397d84a2fbde2aad25b99c2c4%7Emv2.jpg",
  },
  {
    url: "https://www.thirdthinker.com/",
    title: "Third Thinker | become organised and productive",
    imageUrl:
      "https://static.wixstatic.com/media/5bfc36_d0cc1b314f58485b9c1c7152f64a4ce4~mv2.png/v1/fill/w_500,h_500,al_c/5bfc36_d0cc1b314f58485b9c1c7152f64a4ce4~mv2.png",
  },
  {
    url: "https://www.minusthedistractions.com/",
    title: "Home | Minus the Distractions",
    imageUrl:
      "https://static.wixstatic.com/media/e8aae3_96ba0bd7b4fa413cbc4bb48e83e2ebb0~mv2.png/v1/fill/w_500,h_500,al_c/e8aae3_96ba0bd7b4fa413cbc4bb48e83e2ebb0~mv2.png",
  },
  {
    url: "https://www.finleyacesboardandtrain.com/",
    title:
      "Finley Aces Dog Boarding and Training | Dog Boarding | 14 Wales Way, Phenix City, AL, USA",
    imageUrl:
      "https://static.wixstatic.com/media/539a24_7543e6df4861464986045eaa9f5a546a%7Emv2.jpg/v1/fill/w_192%2Ch_192%2Clg_1%2Cusm_0.66_1.00_0.01/539a24_7543e6df4861464986045eaa9f5a546a%7Emv2.jpg",
  },
  {
    url: "http://www.nogatiles.com",
    title: "NOGA cement tiles",
    imageUrl:
      "https://static.wixstatic.com/media/03ab1f_0231ab6f53604f1f899bc38b31b4b286~mv2.png/v1/fill/w_148,h_97,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/03ab1f_0231ab6f53604f1f899bc38b31b4b286~mv2.png",
  },
  {
    url: "https://www.supportmeincourt.com/",
    title: "Home | Support Me In Court",
    imageUrl:
      "https://static.wixstatic.com/media/ed68c2_165b133106d544deade70b527159ddf2~mv2.jpeg/v1/fill/w_120,h_120,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/F6A40074-021F-4C1E-A810-7B000CB73A9C.jpeg",
  },
  {
    url: "https://www.tammythetarotist.biz/",
    title:
      "A Mad Medium Tarot and Psychic Readings Saint Paul MN 763-228-7748  MAD = Making a Difference!",
    imageUrl:
      "https://static.wixstatic.com/media/c084e3_a86faa27fd3e46b8a0009bd5a0f17876%7Emv2.jpg/v1/fit/w_2500,h_1330,al_c/c084e3_a86faa27fd3e46b8a0009bd5a0f17876%7Emv2.jpg",
  },
  {
    url: "http://www.kalman.co.il",
    title: "KSEC",
    imageUrl:
      "https://lh4.googleusercontent.com/_5ccQEN82_dnBJY5vq0tr0LKZkkLc14ZCiQTDpDKRG2KwlAegZVWu48GrI2FnIAoEPtrow=w16383",
  },
  {
    url: "https://omniiartstm.wixsite.com/omnii-avenue",
    title: "OmniiAvenue | free to join",
    imageUrl:
      "https://static.wixstatic.com/media/72eea7_45258486f8554b44aa0b81598ae4cac2%7Emv2.png/v1/fit/w_2500,h_1330,al_c/72eea7_45258486f8554b44aa0b81598ae4cac2%7Emv2.png",
  },
  {
    url: "https://ludscarol17.wixsite.com/m-a-advocacia",
    title: "Página inicial | M A Advocacia",
    imageUrl:
      "https://static.wixstatic.com/media/5aafc3_c9d1161aac9d4405886f166d07325770~mv2.png/v1/fill/w_60,h_60,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/favicon.png",
  },
  {
    url: "https://www.mngns.com/",
    title: "MN GIFTS NOVELTIES SUPPLIES STORE LLC | FUNNY",
    imageUrl:
      "https://static.wixstatic.com/media/e3e582_079768c81c8944509ba754c0d83c9958%7Emv2.png/v1/fit/w_2500,h_1330,al_c/e3e582_079768c81c8944509ba754c0d83c9958%7Emv2.png",
  },
  {
    url: "https://www.woofily.com/",
    title: "Woofily - Pet Hosting, Pet Boarding and Pet Community",
    imageUrl: "https://www.woofily.com/favicon.ico",
  },
  {
    url: "https://www.clinicasabeanas.com/",
    title:
      "Clínica Sabeanas | ana lucia nogueira | Praça Do Junqueiro, 2775-615 Carcavelos, Portugal",
    imageUrl:
      "https://static.wixstatic.com/media/48f52b_5d769f2d4a934ff498a2fe16d41ac419~mv2.jpg/v1/fill/w_2500,h_1046,al_c/48f52b_5d769f2d4a934ff498a2fe16d41ac419~mv2.jpg",
  },
  {
    url: "https://www.safehavenhealth.co/",
    title: "Safe Haven Health: Your Mind is Your Safe Haven",
    imageUrl:
      "https://www.safehavenhealth.co/wp-content/uploads/2023/01/cropped-Safe-Haven-Health-logo-32x32.png",
  },
  {
    url: "https://www.houseofglitternc.com/",
    title: "SHOP | House Of Glitter",
    imageUrl:
      "https://static.wixstatic.com/media/53a3ab_890bde4970274ad8b16bd28448d3f982~mv2.png/v1/crop/x_128,y_389,w_742,h_213/fill/w_250,h_72,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/53a3ab_890bde4970274ad8b16bd28448d3f982~mv2.png",
  },
  {
    url: "https://www.entertainingeconomist.com/",
    title: "Entertaining Economist LLC  | Entertaining Economics ™",
    imageUrl:
      "https://static.wixstatic.com/media/c4b11b_a3cd622b39bb4d11abc62dccaf8be321%7Emv2.png/v1/fit/w_2500,h_1330,al_c/c4b11b_a3cd622b39bb4d11abc62dccaf8be321%7Emv2.png",
  },
  {
    url: "https://www.marinapolis.co.uk/",
    title: "Entertaining Economist LLC  | Entertaining Economics ™",
    imageUrl:
      "https://static.wixstatic.com/media/c4b11b_a3cd622b39bb4d11abc62dccaf8be321%7Emv2.png/v1/fit/w_2500,h_1330,al_c/c4b11b_a3cd622b39bb4d11abc62dccaf8be321%7Emv2.png",
  },
  {
    url: "https://english.wgalil.ac.il/",
    title: "Western Galilee College - Center for Academic Excellence",
    imageUrl:
      "https://english.wgalil.ac.il/wp-content/uploads/2020/01/ogimage.png",
  },
  {
    url: "http://www.shookbook.co.il",
    title: "shookbook-client",
    imageUrl: "http://www.shookbook.co.il/favicon.ico",
  },
  {
    url: "https://itsallwidgets.com/time-merits-a-time-bank",
    title: "Time Merits (time banking app)",
    imageUrl:
      "https://itsallwidgets.com/screenshots/app-1579.png?updated_at=2024-03-17%2001:03:40",
  },
  {
    url: "https://www.paramedikol.com/",
    title: "Paramedical Course | Paramedical Institute | Kolkata",
    imageUrl:
      "https://static.wixstatic.com/media/672517_1e07950bfdd148cfaa9c3fc316900dc9~mv2.png/v1/fill/w_242,h_328,al_c/672517_1e07950bfdd148cfaa9c3fc316900dc9~mv2.png",
  },
  {
    url: "https://www.zvuv.net/",
    title: "",
    imageUrl: "",
  },
  {
    url: "https://www.bartranslates.com/",
    title: "Bar Yitzhaky Translations | bartranslates.com | בר יצחקי תרגומים",
    imageUrl:
      "https://static.wixstatic.com/media/288abb_e9c8a75e63374e99a2853d767992c931%7Emv2.png/v1/fit/w_2500,h_1330,al_c/288abb_e9c8a75e63374e99a2853d767992c931%7Emv2.png",
  },
  {
    url: "https://www.ecom.wix-master.com/",
    title: "",
    imageUrl: "",
  },
  {
    url: "https://www.lashshrink.com/",
    title:
      "Stunning Lash Extensions and Lash Lifts | The Lash Shrink LLC | Lake Bluff IL",
    imageUrl:
      "https://static.wixstatic.com/media/0f3227_1de14d5234694e30a691d2ac51e6c957~mv2.jpg/v1/fill/w_130,h_86,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/0f3227_1de14d5234694e30a691d2ac51e6c957~mv2.jpg",
  },
  {
    url: "https://www.dfwroofycasa.com/",
    title:
      "DFW Roof Y Casa | real estate | Dallas-Fort Worth Metropolitan Area, TX, USA",
    imageUrl:
      "https://static.wixstatic.com/media/b9fae5_64ce31e751c14c98b9d65daa6de71010%7Emv2.jpg/v1/fit/w_2500,h_1330,al_c/b9fae5_64ce31e751c14c98b9d65daa6de71010%7Emv2.jpg",
  },
  {
    url: "https://www.daniellecowles.com/",
    title: "Home | Danielle M. Cowles",
    imageUrl: "https://static.parastorage.com/client/pfavico.ico",
  },
  {
    url: "https://www.thekarmahouse.org/",
    title: "The Karma House | Kava Bar & Tea House | Lakewood, CO",
    imageUrl:
      "https://static.wixstatic.com/media/604de2_1148c05bf02942f8b3be74df32ab376b%7Emv2.png/v1/fit/w_2500,h_1330,al_c/604de2_1148c05bf02942f8b3be74df32ab376b%7Emv2.png",
  },
  {
    url: "https://www.madgeandmidge.com/",
    title: "Simple Positive Blog | Madge And Midge",
    imageUrl:
      "https://static.wixstatic.com/media/80f7f2_fc677d81e26b48459916b53d8f430c84%7Emv2.jpg/v1/fit/w_2500,h_1330,al_c/80f7f2_fc677d81e26b48459916b53d8f430c84%7Emv2.jpg",
  },
  {
    url: "https://www.protrack.co.il/",
    title: "PROTRACK | Pointing the Way",
    imageUrl:
      "https://static.wixstatic.com/media/18c60f_983c0944fd8c43a6af6107c023e1d37e~mv2.png/v1/fill/w_1504,h_924,al_c/18c60f_983c0944fd8c43a6af6107c023e1d37e~mv2.png",
  },
  {
    url: "https://www.themtsnetwork.com/",
    title: "Home | The MTS Network",
    imageUrl:
      "https://static.wixstatic.com/media/8224c1_08ca5e0a025f4e62bb6fade6751e56f6%7Emv2.png/v1/fit/w_2500,h_1330,al_c/8224c1_08ca5e0a025f4e62bb6fade6751e56f6%7Emv2.png",
  },
  {
    url: "https://www.twangmusicacademy.com/",
    title:
      "Twang Music Academy | Musical instrument tuition | 94 High Street, London SE20 7EZ, UK",
    imageUrl:
      "https://static.wixstatic.com/media/cd3905_72d7d143729244b4bd221de54593d8de~mv2.png/v1/fill/w_337,h_136,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/twang%20music%20academy.png",
  },
  {
    url: "https://www.kendrakeefer.com/",
    title: "Kendra Keefer Art",
    imageUrl:
      "https://static.wixstatic.com/media/2844e9_b6ff1c0494ac46d2a069a533b8dd00c8~mv2.jpg/v1/fill/w_899,h_897,al_c/2844e9_b6ff1c0494ac46d2a069a533b8dd00c8~mv2.jpg",
  },
  {
    url: "https://ginade927.wixsite.com/foldilocks",
    title: "Foldilocks | Laundry",
    imageUrl:
      "https://static.wixstatic.com/media/fd33f3_2fed1d16054e4ad28bb9237a6ba93545%7Emv2.jpg/v1/fit/w_2500,h_1330,al_c/fd33f3_2fed1d16054e4ad28bb9237a6ba93545%7Emv2.jpg",
  },
  {
    url: "https://www.shtpfarms.com/",
    title: "Organic Mango | Shtp Farms Private Limited",
    imageUrl: "https://static.parastorage.com/client/pfavico.ico",
  },
  {
    url: "https://www.wixcon.net/",
    title: "Home | Law & Liberation",
    imageUrl:
      "https://static.wixstatic.com/media/66951c_6c91fe6189c6442cade8157649897ce5%7Emv2.jpg/v1/fit/w_2500,h_1330,al_c/66951c_6c91fe6189c6442cade8157649897ce5%7Emv2.jpg",
  },
  {
    url: "https://www.wecleannaturally.com/",
    title: "Home | NaturallyCleanSpaces",
    imageUrl:
      "https://static.wixstatic.com/media/3254b9_bb4f3a96482d4851831d8b76d2972884%7Emv2.png/v1/fit/w_2500,h_1330,al_c/3254b9_bb4f3a96482d4851831d8b76d2972884%7Emv2.png",
  },
  {
    url: "https://www.maryssafehaven.org/",
    title: "Home | Mary's Safe Haven LLC.",
    imageUrl:
      "https://static.wixstatic.com/media/11062b_3a4b98c34cf64768b1ced85cdced9afd~mv2.jpg/v1/fill/w_147,h_98,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/11062b_3a4b98c34cf64768b1ced85cdced9afd~mv2.jpg",
  },
  {
    url: "https://www.2223storehappy.com/",
    title: "HOME | 2322ecome",
    imageUrl: "https://static.parastorage.com/client/pfavico.ico",
  },
  {
    url: "https://www.katelynjontel.com/",
    title: "Home | KatelynJontel",
    imageUrl:
      "https://static.wixstatic.com/media/197795_52efe81f8b9a4b70ba78b70a877cb753%7Emv2.png/v1/fit/w_2500,h_1330,al_c/197795_52efe81f8b9a4b70ba78b70a877cb753%7Emv2.png",
  },
  {
    url: "https://www.prettyflamegame.com/",
    title: "Hand Poured Candles | Pretty Flame Game",
    imageUrl:
      "https://static.wixstatic.com/media/616d6b_f22515d6bd2a41b492a69c41c77499c0%7Emv2.jpeg/v1/fit/w_2500,h_1330,al_c/616d6b_f22515d6bd2a41b492a69c41c77499c0%7Emv2.jpeg",
  },
  {
    url: "http://fidelis.t-market.co.il/",
    title: "http://fidelis.t-market.co.il/",
    imageUrl: "",
  },
  {
    url: "https://wendi-portal.tikshoov.co.il:44435/enterprise",
    title: "WendiConnect",
    imageUrl: "",
  },
  {
    url: "https://www.liron.online/",
    title: "Educational Jigsaw Puzzles Games - Liron",
    imageUrl:
      "https://static.wixstatic.com/media/e292b4_0eae51ec1dcd4a9c848648c6993ef131%7Emv2.png/v1/fit/w_2500,h_1330,al_c/e292b4_0eae51ec1dcd4a9c848648c6993ef131%7Emv2.png",
  },
  {
    url: "https://www.sharonadesign.co.il/",
    title: "Sharona Gil - UX/UI Designer",
    imageUrl:
      "https://lh5.googleusercontent.com/RtKu5KVvbCDo5g47C-3vQF8rQpdRkF9OGXXID_NRnBcXAAw73yer9c-e1VeNnboG-xuCK7BGYBmlr-qBP4Bc5TU=w16383",
  },
  {
    url: "https://www.speaklifedesignsbycs.com/",
    title: "",
    imageUrl: "",
  },
  {
    url: "https://jailynsu.wixsite.com/resourceher",
    title: "Home | Resourceher",
    imageUrl:
      "https://static.wixstatic.com/media/10538c_5506e2d3be574507b5eea82b17652f07~mv2.jpg/v1/fill/w_84,h_36,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/10538c_5506e2d3be574507b5eea82b17652f07~mv2.jpg",
  },
  {
    url: "https://www.mindshock7.com/",
    title: "Mind Shock 7 | Body Butter, Candles, Natual Soap and more!",
    imageUrl:
      "https://static.wixstatic.com/media/3dcbea_46fbca64d9b14b35a67c87d169f3f423~mv2.png/v1/fill/w_233,h_130,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/MS7%202024%20Log0_edited.png",
  },
  {
    url: "https://www.dreamscometrue.foundation/",
    title: "關於我們  | 夢想成真基金會 | Work For All | HK",
    imageUrl:
      "https://static.wixstatic.com/media/3c10aa_b5ee7dfcf27b4a80947796ccadf757ae~mv2.png/v1/fill/w_368,h_127,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/%E5%A4%A2%E6%83%B3%E6%88%90%E7%9C%9F%E5%9F%BA%E9%87%91%E6%9C%83LOGO_5-6-2018.png",
  },
  {
    url: "https://www.talkhealresolve.com/",
    title: "Onlinecounseling | Talk Heal Resolve",
    imageUrl:
      "https://static.wixstatic.com/media/0c954b_98255f35ed884c088317df8018cc58a7%7Emv2.png/v1/fit/w_2500,h_1330,al_c/0c954b_98255f35ed884c088317df8018cc58a7%7Emv2.png",
  },
  {
    url: "https://www.erotikshop-germany.com/",
    title: "Sexshop erotikshop germany | Sexshop",
    imageUrl: "https://static.parastorage.com/client/pfavico.ico",
  },
  {
    url: "http://glimmer.co.il",
    title: "http://glimmer.co.il",
    imageUrl: "",
  },
  {
    url: "https://www.yournumberonesie.com/",
    title:
      "Your Number Onesie / A quality baby boutique, with unique custom gifts, Boutique &Handmade Baby clothes, and a whole lot of LOVE. / Bayonne, NJ",
    imageUrl:
      "https://static.wixstatic.com/media/a680c4_672b6842bb434dc2acd6c25c6d061497%7Emv2.png/v1/fit/w_2500,h_1330,al_c/a680c4_672b6842bb434dc2acd6c25c6d061497%7Emv2.png",
  },
  {
    url: "https://www.mindtheorytherapy.com/",
    title: "Mind Theory Therapy, PLLC | Online Mental Health Therapy",
    imageUrl:
      "https://static.wixstatic.com/media/6d22a8_56ae781466214e4ea89f265cd81b4a35%7Emv2.png/v1/fit/w_2500,h_1330,al_c/6d22a8_56ae781466214e4ea89f265cd81b4a35%7Emv2.png",
  },
  {
    url: "http://www.kancelaria-ustupski.pl/",
    title: "Czas na ulepszenie!",
    imageUrl:
      "https://cdn-cms-s.f-static.net/manager/websites/site123_website/files/logos/brand_files_2020/Icons/Png/Icon_blue.png",
  },
  {
    url: "https://www.sunshinealchemistsandsoapco.com/",
    title:
      "Sunshine Alchemists & Soap Co & Night Sun Candles\nAmazonAmerican ExpressApple PayDiners ClubDiscoverGoogle PayMastercardPayPalShop PayVenmoVisa",
    imageUrl:
      "http://sunshinealchemistsandsoapco.com/cdn/shop/files/Sunship_Only_Logo_3_d718087e-aa70-48dc-8adf-7a7c7dbd72ba.png?v=1725586256",
  },
  {
    url: "http://www.nehrubalsamiti.org/",
    title:
      "Nehru Bal Samiti (NBS)  | Empowering Communities Through Art and Education",
    imageUrl: "",
  },
  {
    url: "https://www.chesschildren88inc.org/",
    title:
      "Chess For Real Life Skills | Chess Children Inc | Wisconsinarrow&amp;v",
    imageUrl:
      "https://static.wixstatic.com/media/65d6d6_62990c46ee4f46a894f499f811d232aa%7Emv2.png/v1/fit/w_2500,h_1330,al_c/65d6d6_62990c46ee4f46a894f499f811d232aa%7Emv2.png",
  },
  {
    url: "http://www.wonderwix.net",
    title: "WonderWix Advanced Velo Solutions",
    imageUrl:
      "https://static.wixstatic.com/media/22fc66_89c22a5eabac492a90d63103e238fb3b%7Emv2.png/v1/fit/w_2500,h_1330,al_c/22fc66_89c22a5eabac492a90d63103e238fb3b%7Emv2.png",
  },
  {
    url: "https://play.google.com/store/apps/details?id=com.maccabi.ewavemobile.fattal",
    title: "My Fattal - Apps on Google Play",
    imageUrl:
      "https://play-lh.googleusercontent.com/oMGzTTmP3cU5FBXJRCQf5_pGOVj-V-K3z_CSjyeCU1MQ2b3sq0GIYQVCHL8WxOnuZrbH",
    position: positions.app,
  },
  {
    url: "https://www.penguinstrategies.com/",
    title: "Penguin | HubSpot Technical Consultants",
    imageUrl: "https://www.penguinstrategies.com/hubfs/homepage-thumbnail.webp",
  },
  {
    url: "https://www.jlarepair.com/",
    title: "",
    imageUrl: "",
  },
  {
    url: "https://www.labellerougewriter.com/",
    title: "La Belle Rouge Website Welcome| La Belle Rouge",
    imageUrl:
      "https://static.wixstatic.com/media/e51e06_33ea7b36333f49d4b67719cffa16a570%7Emv2.jpg/v1/fit/w_2500,h_1330,al_c/e51e06_33ea7b36333f49d4b67719cffa16a570%7Emv2.jpg",
  },
  {
    url: "https://www.coaching-danae-nagel.com/",
    title: "Coaching Danae Nagel | Academic accompany",
    imageUrl:
      "https://static.wixstatic.com/media/661fe4_58d1c6240664448d846e92987a27d575%7Emv2.png/v1/fit/w_2500,h_1330,al_c/661fe4_58d1c6240664448d846e92987a27d575%7Emv2.png",
  },
  {
    url: "https://www.nomadonroad.com/",
    title:
      "nomadonroad  | Travel Blog0 comments0 comments0 comments0 comments0 comments0 comments",
    imageUrl:
      "https://static.wixstatic.com/media/11062b_bf08235007914f8498f355d22d71922af000.jpg/v1/fill/w_147,h_83,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/11062b_bf08235007914f8498f355d22d71922af000.jpg",
  },
  {
    url: "https://www.blacksheepinterest.com/",
    title: "Personal Finance Community | BlackSheep Interest",
    imageUrl: "https://static.parastorage.com/client/pfavico.ico",
  },
  {
    url: "https://www.askwhyinfo.com/",
    title: "",
    imageUrl: "",
  },
  {
    url: "https://www.fencing.org.il/",
    title: "Israel Fencing Association",
    imageUrl: "https://www.fencing.org.il/wp-content/uploads/2017/01/logo.png",
  },
  {
    url: "https://www.whateverudesire.com/",
    title:
      "The Real Original Only Authentic Messiah|WhateverUdesire.com|Kenneth Ian Davis|The Magnificent Mesmerizing Messiah",
    imageUrl:
      "https://static.wixstatic.com/media/61b9c6_6d0373a4a16e4a9bba8defad9490edc1%7Emv2.jpg/v1/fit/w_2500,h_1330,al_c/61b9c6_6d0373a4a16e4a9bba8defad9490edc1%7Emv2.jpg",
  },
  {
    url: "https://www.wevolvementalhealthservices.com/",
    title:
      "Wevolve Mental Health Services | Online Counselling | Affordable Therapy| India",
    imageUrl:
      "https://static.wixstatic.com/media/f1268b_9550cda8f4314a89903504e274b1dd9b~mv2.png/v1/fill/w_1970,h_1142,al_c/f1268b_9550cda8f4314a89903504e274b1dd9b~mv2.png",
  },
  {
    url: "https://play.google.com/store/apps/details?id=com.cityc4.mycity",
    title: "My City - Apps on Google Play",
    imageUrl:
      "https://play-lh.googleusercontent.com/MlPAL-g3QbD2l9FfsXZDrnOSBH-4FdlQanUElLyayj8NurLYDiURRQ_aBjDcCJpmtw",
    position: positions.app,
  },
  {
    url: "https://www.saintjohnjunk.com/",
    title: "JJMs Junk Removal | Saint John | Dumpster Rentals",
    imageUrl:
      "https://static.wixstatic.com/media/da3b78_36ce75a8f6ce4b0ba731ed21bee05be2~mv2.png/v1/fill/w_2118,h_1158,al_c/da3b78_36ce75a8f6ce4b0ba731ed21bee05be2~mv2.png",
  },
  {
    url: "https://www.cycleworks603.com/",
    title: "CycleWorks | Cycle Works 603 |Newington",
    imageUrl:
      "https://static.wixstatic.com/media/034616_9d5a4f8e746c4df9a6efb6e2f06899ce%7Emv2.jpg/v1/fit/w_2500,h_1330,al_c/034616_9d5a4f8e746c4df9a6efb6e2f06899ce%7Emv2.jpg",
  },
  {
    url: "https://bglisrael.com/",
    title: "Домашняя страница - BGL Israel",
    imageUrl:
      "https://bglisrael.com/wp-content/uploads/2020/08/logo_BGL-01.png",
  },
  {
    url: "https://cloudi.cloud/",
    title: "Cloudi – Cloud Soultion Provider l Microsoft Gold & Tier-1 Partner",
    imageUrl:
      "https://cloudi.cloud/wp-content/uploads/2021/05/cropped-Cloudiicon1-1-32x32.png",
  },
  {
    url: "https://acs2.tc/1SSKBfR2rg",
    title: "400 The plain HTTP request was sent to HTTPS port",
    imageUrl: "",
  },
  {
    url: "https://acs2.tc/1gdNvQWKTq",
    title: "400 The plain HTTP request was sent to HTTPS port",
    imageUrl: "",
  },
  {
    url: "https://www.cypressenefitness.com/",
    title:
      "Cypressene Fitness LLC | Personal training in Adrian | 118 W Church St. Suite #1, Adrian, MI, USA",
    imageUrl:
      "https://static.wixstatic.com/media/d01636_3c129fa556794bc9a6d4b19f7968b454%7Emv2.png/v1/fit/w_2500,h_1330,al_c/d01636_3c129fa556794bc9a6d4b19f7968b454%7Emv2.png",
  },
  {
    url: "https://www.thandarsgarden.com/",
    title: "Home Decor | Thandar's Garden | Kochi",
    imageUrl:
      "https://static.wixstatic.com/media/7fdc58_9f33035d84f449a88791790e9d8d74c5%7Emv2.png/v1/fit/w_2500,h_1330,al_c/7fdc58_9f33035d84f449a88791790e9d8d74c5%7Emv2.png",
  },
  {
    url: "https://www.redrabbitstaffing.com/",
    title: "Kitchener Ece Supply | Red Rabbit Child Care Staffing Agency",
    imageUrl:
      "https://static.wixstatic.com/media/a7c5c9_30eb0d556e74459e920f5ffb9199d1b7%7Emv2.png/v1/fit/w_2500,h_1330,al_c/a7c5c9_30eb0d556e74459e920f5ffb9199d1b7%7Emv2.png",
  },
  {
    url: "https://www.pedrasnocaminho.org/",
    title: "Associação Pedras No Caminho",
    imageUrl:
      "https://static.wixstatic.com/media/459dfb_225ab2097dbf4cb28e76b1c021c498fa%7Emv2.jpg/v1/fit/w_2500,h_1330,al_c/459dfb_225ab2097dbf4cb28e76b1c021c498fa%7Emv2.jpg",
  },
  {
    url: "http://www.zenetude.ca/",
    title: "Zenetude | yoga",
    imageUrl:
      "https://static.wixstatic.com/media/2967ec_b3cee8ba0b1840bea5947cb67f436306~mv2.gif",
  },
  {
    url: "https://skynet1982777.wixsite.com/my-site-4",
    title: "Home | My Site 4",
    imageUrl:
      "https://static.wixstatic.com/media/84770f_4c9f5c2382514ddfbc9abd8a258305dc~mv2.jpg/v1/fill/w_75,h_110,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_auto/84770f_4c9f5c2382514ddfbc9abd8a258305dc~mv2.jpg",
  },
  {
    url: "https://apps.apple.com/il/app/my-city/id1496577237",
    title: "‎My City on the App Store",
    imageUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/c9/35/d2/c935d2d0-4121-e699-0053-6af58d9da4fc/AppIcon-1x_U007epad-0-85-220-0.png/1200x630wa.png",
  },
  {
    url: "http://www.butterflycounseling.org/",
    title:
      "Butterfly Counseling  | Counseling | 90 Lakeview Dr. Clinton, MS 39056",
    imageUrl: "https://static.parastorage.com/client/pfavico.ico",
  },
  {
    url: "https://www.mykidsnft.com/",
    title: "https://www.mykidsnft.com/",
    imageUrl:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAADElEQVQI12P4//8/AAX+Av7czFnnAAAAAElFTkSuQmCC",
  },
  {
    url: "https://www.abdlcommunityforus.com/",
    title: "ABDL COMMUINITY | ADULT BABIES AND DIAPER LOVERS",
    imageUrl:
      "https://static.wixstatic.com/media/d2f808_a736e1ae87324dd18e585cfce91c3a18%7Emv2.png/v1/fit/w_2500,h_1330,al_c/d2f808_a736e1ae87324dd18e585cfce91c3a18%7Emv2.png",
  },
  {
    url: "https://www.dentogist.com/",
    title: "Blog Articles | Dentogist",
    imageUrl: "https://static.parastorage.com/client/pfavico.ico",
  },
  {
    url: "https://www.brujitamalainc.org/",
    title: "Casademala / Spiritual Guidance",
    imageUrl:
      "https://static.wixstatic.com/media/616d6b_6bfac919261a4aac872f5c1f181f1515%7Emv2.png/v1/fit/w_2500,h_1330,al_c/616d6b_6bfac919261a4aac872f5c1f181f1515%7Emv2.png",
  },
  {
    url: "https://www.gjtrends.com/",
    title: "Handbags | G J Bags",
    imageUrl:
      "https://static.wixstatic.com/media/54ff73_0bdca3ae5b714ab7975726ee3ec8d195%7Emv2.png/v1/fit/w_2500,h_1330,al_c/54ff73_0bdca3ae5b714ab7975726ee3ec8d195%7Emv2.png",
  },
  {
    url: "http://www.taibeh.muni.il",
    title: "الرئيسية | بلدية الطيبة",
    imageUrl: "https://taibeh.muni.il/images/favicon.ico",
  },
  {
    url: "https://ohadavrahami.wixsite.com/my-site-15",
    title: "Shop | My Site 15",
    imageUrl:
      "https://static.wixstatic.com/media/722022_19868f0278234189938013f205b5d456~mv2.jpg/v1/fill/w_147,h_147,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_auto/722022_19868f0278234189938013f205b5d456~mv2.jpg",
  },
  {
    url: "https://adarahzionne.wixsite.com/adarahzionne",
    title: "Home | Adarah Zionne",
    imageUrl:
      "https://static.wixstatic.com/media/4cadf5_d8a2ee61a1154a259935ff499a379b9d~mv2.jpg/v1/fill/w_288,h_192,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/4cadf5_d8a2ee61a1154a259935ff499a379b9d~mv2.jpg",
  },
  {
    url: "https://carbyne.com",
    title: "Cloud Native Emergency Communication Response Platform | Carbyne",
    imageUrl:
      "https://carbyne.com/wp-content/uploads/2024/03/Mission-Critical-Contact-Centers.png",
  },
  {
    url: "https://sahriaalam.wixsite.com/sahria-alam",
    title: "Home | Sahria Alam",
    imageUrl:
      "https://static.wixstatic.com/media/11062b_e6d34c816aa7425bbe8c6be8f73e50b1~mv2.jpg/v1/fill/w_26,h_18,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/11062b_e6d34c816aa7425bbe8c6be8f73e50b1~mv2.jpg",
  },
  {
    url: "https://christinaleyvas.wixsite.com/christina-leyvas",
    title: "Christina Leyvas | Bead Work",
    imageUrl:
      "https://static.wixstatic.com/media/d060bb_5baa36b56660448fa73e455fba4ba5af~mv2.jpg/v1/fill/w_617,h_874,al_c/d060bb_5baa36b56660448fa73e455fba4ba5af~mv2.jpg",
  },
  {
    url: "https://www.stopmentalhealthstigma.com/",
    title: "STOP Mental Health Stigma - New York",
    imageUrl:
      "https://static.wixstatic.com/media/1cfce0_19015c3fff9d459bba1a46eaae9bac29~mv2.png/v1/fill/w_2500,h_1085,al_c/1cfce0_19015c3fff9d459bba1a46eaae9bac29~mv2.png",
  },
  {
    url: "https://www.butterflycommunitycorp.com/",
    title: "Butterfly Community Corporation",
    imageUrl:
      "https://butterflycommunitycorp.com/wp-content/uploads/2024/03/cropped-Favicon-1-32x32.png",
  },
  {
    url: "https://ohadavrahami.editorx.io/my-site-23",
    title: "Hebrew CC",
    imageUrl: "https://www.editorx.com/favicon.ico",
  },
  {
    url: "https://www.fab-24.com/",
    title: "HOME | Fab 24",
    imageUrl: "https://static.parastorage.com/client/pfavico.ico",
  },
  {
    url: "http://www.youtube.com",
    title: "YouTube",
    imageUrl: "https://www.youtube.com/img/desktop/yt_1200.png",
  },
  {
    url: "https://agelectro.wixsite.com/home",
    title: "Home | ElectronicsForEarth",
    imageUrl:
      "https://static.wixstatic.com/media/80fe89_50bb22f1ea88462192fad12f4a055636~mv2.png/v1/fill/w_60,h_60,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/electro4life.png",
  },
  {
    url: "https://ginarollandi22.wixsite.com/modernhairauthority",
    title:
      "MODERN HAiR AUTHORITY | Expert Traveling Hair Specialist | Exclusive | Private | Elite | Professional | Convenient",
    imageUrl:
      "https://static.wixstatic.com/media/cc9092_7e33cf8615bc43638b8a21ddfdaee64b~mv2_d_5139_3426_s_4_2.jpeg/v1/fit/w_480,h_382,q_90/cc9092_7e33cf8615bc43638b8a21ddfdaee64b~mv2_d_5139_3426_s_4_2.jpeg",
  },
  {
    url: "https://beyond8nfinitycrea.wixsite.com/beyond-infinity-crea",
    title: "Home | Beyond Infinity Crea",
    imageUrl:
      "https://static.wixstatic.com/media/84700cb6c09d43d1a601e7d433b90666.jpg/v1/fill/w_250,h_250,fp_0.50_0.50,q_30,blur_30,enc_auto/84700cb6c09d43d1a601e7d433b90666.webp",
  },
  {
    url: "https://papermoonrabbit.wixsite.com/dvstbvnny-art",
    title: "Home | Amc Art",
    imageUrl:
      "https://static.wixstatic.com/media/8c3b4a_21f59c9f8d15423ab77ddc0a759cc0d2~mv2.png/v1/fill/w_60,h_60,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/transparentlogo.png",
  },
  {
    url: "https://adelinebdv00.wixstudio.io/cygnevirtuosee",
    title: "INTRO | Cygnevirtuosee",
    imageUrl:
      "https://static.wixstatic.com/media/c5d193_0751f942fc604203a65d0d77861ae307f002.jpg/v1/fill/w_90,h_90,al_c,q_80,usm_0.66_1.00_0.01,blur_3,enc_avif,quality_auto/c5d193_0751f942fc604203a65d0d77861ae307f002.jpg",
  },
  {
    url: "https://faygad.wixsite.com/my-site-13",
    title: "HOME | My Site 13",
    imageUrl:
      "https://static.wixstatic.com/media/4fae05_18a08c79702d480a90ac2a0e87bf99d1~mv2.png/v1/fill/w_200,h_200,al_c,q_85,blur_3,enc_avif,quality_auto/butterfly-logo-200.png",
  },
  {
    url: "https://www.hellostylish.co.uk/",
    title: "home | Hello Stylish",
    imageUrl:
      "https://static.wixstatic.com/media/9425a4_ba09f67318074dfc90af41f395d03a30%7Emv2.jpg/v1/fit/w_2500,h_1330,al_c/9425a4_ba09f67318074dfc90af41f395d03a30%7Emv2.jpg",
  },
  {
    url: "https://www.friendslovinglife.com/",
    title: "ADME To Life    friendslovinglife.com | growth support",
    imageUrl:
      "https://static.wixstatic.com/media/4fae05_18a08c79702d480a90ac2a0e87bf99d1~mv2.png/v1/fill/w_200,h_200,al_c,q_85,blur_3,enc_avif,quality_auto/butterfly-logo-200.png",
  },
  {
    url: "http://www.myavivim.co.il",
    title: "Request Rejected",
    imageUrl: "",
  },
  {
    url: "https://theeliteclubza.wixsite.com/the-elite-club",
    title: "Home | Test2",
    imageUrl:
      "https://static.wixstatic.com/media/414ac2_1e0db5bf36e543e2ba897d1453dfa6d9~mv2.jpg/v1/fill/w_95,h_98,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/414ac2_1e0db5bf36e543e2ba897d1453dfa6d9~mv2.jpg",
  },
  {
    url: "https://www.sendingsunshinegifts.com/",
    title:
      "Home | Sending Sunshine Gifts | Thoughtful Care Packages and Feel Good Gifts",
    imageUrl:
      "https://static.wixstatic.com/media/c1d78a_3978f293e7a44a49a48f79af14e763ad~mv2.jpg/v1/fill/w_2500,h_951,al_c/c1d78a_3978f293e7a44a49a48f79af14e763ad~mv2.jpg",
  },
  {
    url: "https://mhihamidul.wixsite.com/mhi-hamidul",
    title: "HOME | My Site 2",
    imageUrl:
      "https://static.wixstatic.com/media/84770f_b98c8b47c5b047efb18ac4d17f50462a~mv2.jpg/v1/crop/x_675,y_0,w_6150,h_4237/fill/w_1016,h_700,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/pexels-vlada-karpovich-6755753-122.jpg",
  },
  {
    url: "https://www.oontztopia.com/",
    title: "Home | OONTZTOPIA",
    imageUrl:
      "https://static.wixstatic.com/media/250f80_772e57ac720c4198a6149db956f8951f%7Emv2.jpg/v1/fit/w_2500,h_1330,al_c/250f80_772e57ac720c4198a6149db956f8951f%7Emv2.jpg",
  },
  {
    url: "https://www.sinystersoulutionsstudios.com/",
    title: "Sinyster Soulutions Studios LLC | Film",
    imageUrl:
      "https://static.wixstatic.com/media/a74dd9_f156a30a573a434899af0d91c6ac50ff%7Emv2.png/v1/fit/w_2500,h_1330,al_c/a74dd9_f156a30a573a434899af0d91c6ac50ff%7Emv2.png",
  },
  {
    url: "https://www.lakesidetreeandlandscaping.com/",
    title: "VOTED#1  | LAKESIDE TREE AND LANDSCAPE MANASSAS",
    imageUrl:
      "https://static.wixstatic.com/media/833c21_662b6073af814b74bc2b905ed68cbfd1~mv2.jpg/v1/fill/w_1195,h_800,al_c/833c21_662b6073af814b74bc2b905ed68cbfd1~mv2.jpg",
  },
  {
    url: "https://andrxorion.wixsite.com/sandie",
    title: "sandie | chill",
    imageUrl:
      "https://static.wixstatic.com/media/11062b_829d144a09cb498280e4e50f99f10ba0~mv2.jpg/v1/fill/w_56,h_84,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/11062b_829d144a09cb498280e4e50f99f10ba0~mv2.jpg",
  },
  {
    url: "https://sladybug.wixsite.com/the-pink-mermaid-caf",
    title: "HOME | The Pink Mermaid",
    imageUrl:
      "https://static.wixstatic.com/media/6f8bd5_960566baff37427fb68585009f5e9c89~mv2.jpg/v1/fill/w_218,h_200,al_c,lg_1,q_80,enc_avif,quality_auto/6f8bd5_960566baff37427fb68585009f5e9c89~mv2.jpg",
  },
  {
    url: "https://idoy83.wixsite.com/atrizaken",
    title: "Home | Atrizaken",
    imageUrl:
      "https://static.wixstatic.com/media/f61af8_cd306598759243c4a481310f3a50cf85~mv2.png/v1/fill/w_68,h_40,al_c,q_85,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/f61af8_cd306598759243c4a481310f3a50cf85~mv2.png",
  },
  {
    url: "https://www.oontztopia.com/yunioontz",
    title: "ESR | OONTZTOPIA",
    imageUrl:
      "https://static.wixstatic.com/media/250f80_772e57ac720c4198a6149db956f8951f%7Emv2.jpg/v1/fit/w_2500,h_1330,al_c/250f80_772e57ac720c4198a6149db956f8951f%7Emv2.jpg",
  },
  {
    url: "https://www.uptownwellness.org/",
    title: "Uptown Wellness | Psychotherapy And Counselling",
    imageUrl:
      "https://static.wixstatic.com/media/2bcb88_47f4a27761584ea98b72eb6d974ca6e7%7Emv2.png/v1/fit/w_2500,h_1330,al_c/2bcb88_47f4a27761584ea98b72eb6d974ca6e7%7Emv2.png",
  },
  {
    url: "https://www.surefireway.org/",
    title: "Coaching | Surefire Way",
    imageUrl:
      "https://static.wixstatic.com/media/11062b_bf093d2ea776433b86cf01b719a2f54d~mv2.jpg/v1/fill/w_1920,h_1280,al_c,q_90,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/11062b_bf093d2ea776433b86cf01b719a2f54d~mv2.jpg",
  },
  {
    url: "https://guypor.editorx.io/my-site-787",
    title: "Home | My Site 787",
    imageUrl: "https://www.editorx.com/favicon.ico",
  },
  {
    url: "https://katyakot7.wixstudio.io/my-site-27",
    title: "Home | My Site 27",
    imageUrl:
      "https://static.wixstatic.com/media/bc018e_5f351bc78a9f4c2bb8909cdb9adc3dd2~mv2.png/v1/fill/w_49,h_33,al_c,q_85,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/bc018e_5f351bc78a9f4c2bb8909cdb9adc3dd2~mv2.png",
  },
  {
    url: "http://www.lyssiotislaw.com",
    title: "Lyssiotis Law Advocates",
    imageUrl: "https://lyssiotislaw.com/resources/uploads/2020/11/Logo-new.png",
  },
  {
    url: "https://www.newstreamingnetwork.com/",
    title: "NEW Streaming Network.com | Online TV Podcasts & Radio",
    imageUrl:
      "https://static.wixstatic.com/media/cf999c_186c323f16b64a1b9aae444dca9209f7~mv2.png/v1/fill/w_820,h_312,al_c/cf999c_186c323f16b64a1b9aae444dca9209f7~mv2.png",
  },
  {
    url: "https://dorch3.wixsite.com/es-test-2",
    title: "Home | Es Test 2",
    imageUrl: "https://www.wix.com/favicon.ico",
  },
  {
    url: "https://saferelocatemobile.wixsite.com/saferelocate",
    title: "Home | Safe Relocate",
    imageUrl:
      "https://static.wixstatic.com/media/e3de0633fc9607c1fb1335c40d796247.jpg/v1/fill/w_147,h_97,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/e3de0633fc9607c1fb1335c40d796247.jpg",
  },
  {
    url: "https://www.finesselashandbeauty.com/",
    title: "Eyelash Extensions | Finesse Lash & Beauty Inc. | Oshawa",
    imageUrl:
      "https://static.wixstatic.com/media/704b2f_8e430238c0b64b168550a8e4232ae89a~mv2.jpg/v1/fill/w_174,h_98,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/704b2f_8e430238c0b64b168550a8e4232ae89a~mv2.jpg",
  },
  {
    url: "https://rono31.wixsite.com/my-site-11",
    title: "HOME | My Site 11",
    imageUrl:
      "https://static.wixstatic.com/media/11062b_b75407a670324c39babd882c6c01d983f000.jpg/v1/fill/w_288,h_162,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/11062b_b75407a670324c39babd882c6c01d983f000.jpg",
  },
  {
    url: "https://nfinitenterprises.wixsite.com/nfiniteenterprises",
    title: "Home | N'finite Desires",
    imageUrl:
      "https://static.wixstatic.com/media/4fae05_18a08c79702d480a90ac2a0e87bf99d1~mv2.png/v1/fill/w_200,h_200,al_c,q_85,blur_3,enc_avif,quality_auto/butterfly-logo-200.png",
  },
  {
    url: "https://www.florthizmetleri.net/",
    title: "Eskişehir Travestileri Maviş Maviyden Masaj Evi",
    imageUrl:
      "https://static.wixstatic.com/media/32c1e9_d9f250b23bd04e5aa2405122598bb468~mv2.jpg/v1/fill/w_201,h_201,al_c/32c1e9_d9f250b23bd04e5aa2405122598bb468~mv2.jpg",
  },
  {
    url: "https://www.magnoliahealthcareservices.com/",
    title: "Magnolia Healthcare personal and home care services Colorado, USA",
    imageUrl:
      "https://static.wixstatic.com/media/7f22d7_13eef68d0e744d669f298a4dac35d5c1%7Emv2.png/v1/fit/w_2500,h_1330,al_c/7f22d7_13eef68d0e744d669f298a4dac35d5c1%7Emv2.png",
  },
  {
    url: "https://shannondaleah.wixsite.com/mysite",
    title:
      "Womb & Bloom | women's wellness0 comments0 comments0 comments0 comments0 comments0 comments",
    imageUrl:
      "https://static.wixstatic.com/media/ca7d7d_6fd7b147a82a4e7682ef2cc2c85d3a16%7Emv2.png/v1/fit/w_2500,h_1330,al_c/ca7d7d_6fd7b147a82a4e7682ef2cc2c85d3a16%7Emv2.png",
  },
  {
    url: "https://www.alvaradohelpinghands.com/",
    title:
      "Alvarado Helping Hands for Jesus  Serving Johnson County Food Bank  | Johnson County Texas Food Bank | 404 North Parkway Drive, Alvarado, TX, USA",
    imageUrl:
      "https://static.wixstatic.com/media/ed8bc4_faedfe60eba54b06ae6096482401c2be%7Emv2.jpeg/v1/fit/w_2500,h_1330,al_c/ed8bc4_faedfe60eba54b06ae6096482401c2be%7Emv2.jpeg",
  },
  {
    url: "https://www.postandservice.com/",
    title:
      "Lettere | Italia | POST & Service | Poste Private | Atti Giudiziari | Mail Express Poste Private",
    imageUrl:
      "https://static.wixstatic.com/media/ab02be_aaed2b4e5f184f4e8a18f88d2a10a79e%7Emv2.png/v1/fit/w_2500,h_1330,al_c/ab02be_aaed2b4e5f184f4e8a18f88d2a10a79e%7Emv2.png",
  },
  {
    url: "https://ohadavrahami.editorx.io/my-site-13",
    title: "Home | My Site 13",
    imageUrl:
      "https://static.wixstatic.com/media/nsplsh_3034394d5f63726175356b~mv2_d_4000_6000_s_4_2.jpg/v1/fill/w_147,h_221,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/Image%20by%20Rodion%20Kutsaiev.jpg",
  },
  {
    url: "https://singdev.wixsite.com/sing-developments",
    title: "Sing Developments",
    imageUrl:
      "https://static.wixstatic.com/media/3bccf5_cdaa6d4e7965444583b7c7b27f7ce4d0~mv2.png",
  },
  {
    url: "https://localfriends3.wixsite.com/local-1",
    title: "Connections | Local",
    imageUrl:
      "https://static.wixstatic.com/media/4fae05_18a08c79702d480a90ac2a0e87bf99d1~mv2.png/v1/fill/w_200,h_200,al_c,q_85,blur_3,enc_avif,quality_auto/butterfly-logo-200.png",
  },
  {
    url: "https://www.enraptureme.org/",
    title: "Home | EnraptureMe Witch",
    imageUrl:
      "https://static.wixstatic.com/media/cd7f8b_5e9a93b1a1fc488cb0c1e30951336f7a~mv2.jpg/v1/fill/w_100,h_80,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Untitled.jpg",
  },
  {
    url: "https://starworkit.wixstudio.io/my-site-1",
    title: "ANASAYFA | My Site 1",
    imageUrl:
      "https://static.wixstatic.com/media/3568c7_74e152119de747ffa11d669086243be2~mv2.png/v1/fill/w_125,h_125,al_c,q_85,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/starwork.png",
  },
  {
    url: "https://www.unfilterthatlens.com/",
    title: "ANXIETY | UNFILTER THAT LENS",
    imageUrl:
      "https://static.wixstatic.com/media/9b3176_01cb39e756b543a1a86bb6786862e1f4%7Emv2.jpg/v1/fit/w_2500,h_1330,al_c/9b3176_01cb39e756b543a1a86bb6786862e1f4%7Emv2.jpg",
  },
  {
    url: "https://ohadavrahami.wixsite.com/testappohgeneral",
    title: "Home | Testappohgeneral",
    imageUrl:
      "https://static.wixstatic.com/media/c837a6_938269b105e04d2c8a3462e43263ecf4~mv2.jpg/v1/fill/w_147,h_83,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/c837a6_938269b105e04d2c8a3462e43263ecf4~mv2.jpg",
  },
  {
    url: "https://www.dev-site-1x2368-2.wixdev-sites.org/",
    title: "Home | Dev Site 1x2368 2",
    imageUrl:
      "https://static.wixstatic.com/media/4fae05_18a08c79702d480a90ac2a0e87bf99d1~mv2.png/v1/fill/w_200,h_200,al_c,q_85,blur_3,enc_avif,quality_auto/butterfly-logo-200.png",
  },
  {
    url: "https://perryshalom.wixsite.com/perry",
    title: "Home | Perry",
    imageUrl:
      "https://static.wixstatic.com/media/11062b_a6f0fec9397443e8b4bbdbf4e74ca024~mv2.jpg/v1/fill/w_123,h_82,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/11062b_a6f0fec9397443e8b4bbdbf4e74ca024~mv2.jpg",
  },
  {
    url: "https://www.applefeng.design/",
    title: "Home | Karena Apple Feng",
    imageUrl:
      "https://static.wixstatic.com/media/a4d2eb_c732a70dfe404515a43e02710aa7c668%7Emv2.jpeg/v1/fit/w_2500,h_1330,al_c/a4d2eb_c732a70dfe404515a43e02710aa7c668%7Emv2.jpeg",
  },
  {
    url: "https://www.intellsecurities.com/",
    title: "Intelligent Securities | Cyber Security",
    imageUrl:
      "https://static.wixstatic.com/media/11062b_81343f0b2bce4fc8a34cbf23de423eb4~mv2.jpg/v1/fill/w_121,h_64,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/11062b_81343f0b2bce4fc8a34cbf23de423eb4~mv2.jpg",
  },
  {
    url: "http://shlomibee.com",
    title: "http://shlomibee.com",
    imageUrl: "",
  },
  {
    url: "https://jashrajsuthar605.wixsite.com/crschetanyt",
    title: "Home | Crschetanyt",
    imageUrl:
      "https://static.wixstatic.com/media/553f4a_36ba51ce2d824879b52f5d90cb556b7e~mv2.jpg/v1/fill/w_80,h_80,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Untitled.jpg",
  },
  {
    url: "https://cjmcb1993.wixsite.com/razorsharptraining",
    title: "Home | S.O.D Safety Training",
    imageUrl:
      "https://static.wixstatic.com/media/82eb30_0af588adf193487a89b965eca6a8683d~mv2.jpg/v1/fill/w_80,h_80,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/razorsharplogo_edited_edited.jpg",
  },
  {
    url: "https://tzukima.wixsite.com/my-site",
    title: "Home | My Site",
    imageUrl: "https://www.wix.com/favicon.ico",
  },
  {
    url: "https://hanemala.co.il/",
    title: "hanemalaMenu",
    imageUrl: "https://hanemala.co.il/facebookImage.png",
  },
  {
    url: "https://www.samsung.com/ps",
    title: "Samsung Palestine | هواتف ذكية - تلفزيونات - اجهزة منزلية",
    imageUrl:
      "https://cdn.samsung.com/etc/designs/samsung/global/imgs/logo-square-letter.png",
  },
  {
    url: "https://www.wildernessadventurescic.com/",
    title:
      "Forest School | Playgroup | Arts | Wellness | Wilderness Adventures | Yorkshire",
    imageUrl:
      "https://static.wixstatic.com/media/bb19c2_4068f081a59d47e0b6d6328ebe914057%7Emv2.jpg/v1/fit/w_2500,h_1330,al_c/bb19c2_4068f081a59d47e0b6d6328ebe914057%7Emv2.jpg",
  },
  {
    url: "https://www.tswickedwonders.com/",
    title: "https://www.tswickedwonders.com/",
    imageUrl:
      "https://static.wixstatic.com/media/6d8676_032ee55bcb754de58199b624364effd0%7Emv2.jpg/v1/fill/w_192%2Ch_192%2Clg_1%2Cusm_0.66_1.00_0.01/6d8676_032ee55bcb754de58199b624364effd0%7Emv2.jpg",
  },
  {
    url: "https://www.twangmusicfoundation.com/",
    title:
      "Twang Music Foundation | A Music Tuition Charity in the Borough of Bromley | Twang Music Foundation, High Street, London, UK",
    imageUrl:
      "https://static.wixstatic.com/media/cd3905_6fea211efbf64022aa5099571d05bc02~mv2.png/v1/fill/w_392,h_125,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/TMF%20Logo%20%26%20Slogan-05.png",
  },
  {
    url: "https://idoy83.wixstudio.com/my-site-15",
    title: "Home | My Site 15",
    imageUrl:
      "https://static.wixstatic.com/media/c837a6_5c631fa0004e46e59c0db684575e4534f000.png/v1/fill/w_90,h_90,al_c,q_85,usm_0.66_1.00_0.01,blur_3,enc_avif,quality_auto/c837a6_5c631fa0004e46e59c0db684575e4534f000.png",
  },
  {
    url: "https://www.edenhevroni.net/",
    title: "https://www.edenhevroni.net/",
    imageUrl:
      "https://www.edenhevroni.net/images/logos/1/EDEN_HEVRONI_BANER.png",
  },
  {
    url: "https://www.mtpinitiative.com/",
    title: "Donate | The Mini Taneja Purple Initiative",
    imageUrl:
      "https://static.wixstatic.com/media/6033e9_aa46d9f440e74d239fc8d31d5a1a88c0~mv2.png/v1/fill/w_160,h_160,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/1595460279516%202_PNG.png",
  },
  {
    url: "https://rau94294.wixsite.com/spirit-farmer",
    title: "SPIRIT FARMER | online market shopping",
    imageUrl:
      "https://static.wixstatic.com/media/11062b_d578b9d4ffba48c68d086ec29fe9e6f0f000.jpg/v1/fill/w_61,h_34,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/11062b_d578b9d4ffba48c68d086ec29fe9e6f0f000.jpg",
  },
  {
    url: "https://www.adham-furniture.com/",
    title: "Adham Furniture  | Home",
    imageUrl:
      "https://static.wixstatic.com/media/d2c6a4_d6fa775d4fd64b5894ad0254fad7ada7~mv2.png/v1/fill/w_628,h_502,al_c/d2c6a4_d6fa775d4fd64b5894ad0254fad7ada7~mv2.png",
  },
  {
    url: "https://deeadeea90.wixsite.com/dollyshow90",
    title: "Home | Dollyshow90",
    imageUrl:
      "https://static.wixstatic.com/media/41d000_9724e5a0e7b726020d137b111fa7e916.jpg/v1/fill/w_288,h_288,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/41d000_9724e5a0e7b726020d137b111fa7e916.jpg",
  },
  {
    url: "https://fernando19-0201.wixsite.com/mysite",
    title: "Home | My Site",
    imageUrl: "https://www.wix.com/favicon.ico",
  },
  {
    url: "https://play.google.com/store/apps/details?id=com.connecteamco.connecteamkiosk.app",
    title: "Connecteam Kiosk - Apps on Google Play",
    imageUrl:
      "https://play-lh.googleusercontent.com/2DxUuzE5ENcu9bEy-wls51IVr3V_snq6xw7N3mw9kRwhU-y6n24Xa8xq75qZPJquCd2Y",
    position: positions.app,
  },
  {
    url: "https://sahinkubra564.wixsite.com/my-site",
    title: "Home | Kübrart",
    imageUrl: "https://www.wix.com/favicon.ico",
  },
  {
    url: "https://werkfach.wixsite.com/my-site-6",
    title: "Start | Website-Name",
    imageUrl:
      "https://static.wixstatic.com/media/eadd67_49a592b070974751aae007c36143b493~mv2.jpg/v1/crop/x_0,y_11,w_700,h_448/fill/w_195,h_125,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/thumbnail_edited.jpg",
  },
  {
    url: "https://www.3dplaysensation.com/",
    title: "Virtual reality for SOLIDWORKS and CAD| VR",
    imageUrl:
      "https://static.wixstatic.com/media/496a08_176b1e367bed4ecc88737bce60c9de69%7Emv2.png/v1/fit/w_2500,h_1330,al_c/496a08_176b1e367bed4ecc88737bce60c9de69%7Emv2.png",
  },
  {
    url: "https://www.komorebidesign.com/",
    title: "Komorebi Design Studio",
    imageUrl:
      "https://static.wixstatic.com/media/b6812f_9c4df75297f949e1b137492007cd4ab2%7Emv2.jpg/v1/fit/w_2500,h_1330,al_c/b6812f_9c4df75297f949e1b137492007cd4ab2%7Emv2.jpg",
  },
  {
    url: "https://translate.google.com/",
    title: "Google Translate",
    imageUrl: "https://www.gstatic.com/translate/favicon.ico",
  },
  {
    url: "https://jenniferrmillar.wixsite.com/therapywithjen",
    title: "Jennifer R. Millar, MA",
    imageUrl: "https://www.wix.com/favicon.ico",
  },
  {
    url: "https://www.alteredclassroom.com/",
    title: "Home Hangout | NixcelBooks",
    imageUrl:
      "https://static.wixstatic.com/media/e8aae3_f7b94dd748cb4d849bcca018fcf1999c%7Emv2.png/v1/fit/w_2500,h_1330,al_c/e8aae3_f7b94dd748cb4d849bcca018fcf1999c%7Emv2.png",
  },
  {
    url: "https://accessibleweb.wixsite.com/stylable-menu",
    title: "HOME | My Site 25",
    imageUrl:
      "https://static.wixstatic.com/media/4fae05_18a08c79702d480a90ac2a0e87bf99d1~mv2.png/v1/fill/w_200,h_200,al_c,q_85,blur_3,enc_avif,quality_auto/butterfly-logo-200.png",
  },
  {
    url: "https://nurinbatrisyia126.wixsite.com/smkbbkh-attendance",
    title: "HOME | Smkbbkh Attendance",
    imageUrl:
      "https://static.wixstatic.com/media/9c608a_d3d2804ad1cf4bc1926d84fbe424cc30.jpg/v1/fill/w_288,h_148,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/9c608a_d3d2804ad1cf4bc1926d84fbe424cc30.jpg",
  },
  {
    url: "https://www.rasmus-test.dk/",
    title: "Home | Rasmus - Test",
    imageUrl:
      "https://static.wixstatic.com/media/c837a6_4f7ad41d52dc4640862c7d19c07cdcda~mv2.jpg",
  },
  {
    url: "https://www.sharonadesign.co.il",
    title: "Sharona Gil - UX/UI Designer",
    imageUrl:
      "https://lh5.googleusercontent.com/Yi7sbSVtH-6ZBCiLxtd3zVz_XWjLq3QKzr6iE4ZbAaHyhVYYQYKaOjhhb1NPrGwuOYn4gl2uwk4BS2PeGeLaERM=w16383",
  },
  {
    url: "https://www.empireofice.com/",
    title: "Empire of Ice | adult graphic novel",
    imageUrl:
      "https://static.wixstatic.com/media/4fd13d_e9acba8fcf3a472780a6eb564ae190e7~mv2.png/v1/fill/w_2500,h_2200,al_c/4fd13d_e9acba8fcf3a472780a6eb564ae190e7~mv2.png",
  },
  {
    url: "https://www.psychevisuals.com/",
    title: "Coming Soon | Psyche Visuals",
    imageUrl:
      "https://static.wixstatic.com/media/31bb24_5d91bbda447946259cfba21510c15f63~mv2.png/v1/fill/w_395,h_46,al_c,lg_1,q_85,enc_avif,quality_auto/overlay_edited_edited_edited.png",
  },
  {
    url: "https://www.theirmeetingplace.com/",
    title: "Home THEIR MEETING PLACE The Sequel to The Reliving",
    imageUrl:
      "https://static.wixstatic.com/media/ed56b8_ec112f983a3149ba9cec34319ab1eb65~mv2.jpg/v1/fill/w_355,h_212,al_c/ed56b8_ec112f983a3149ba9cec34319ab1eb65~mv2.jpg",
  },
  {
    url: "https://www.highvibehealing.biz/",
    title: "Payment  Plans & Corporate | My Site",
    imageUrl: "https://static.parastorage.com/client/pfavico.ico",
  },
  {
    url: "https://mysticgoddess1996.wixsite.com/safe-haven",
    title: "Home | SafeHaven",
    imageUrl:
      "https://static.wixstatic.com/media/273de7_c378ca13873a4133807e20cac3070f2f~mv2.jpeg/v1/fill/w_120,h_60,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/PAINT%20BACKGROUND.jpeg",
  },
  {
    url: "https://gallardoalex942.wixsite.com/sagallardo-galleries",
    title: "Selling art works | Sagallardo-galleries",
    imageUrl:
      "https://static.wixstatic.com/media/88d74a1559c84402a4a957527a839260.png/v1/fill/w_96,h_54,al_c,q_85,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/88d74a1559c84402a4a957527a839260.png",
  },
  {
    url: "https://devyanisrivastava0.wixsite.com/havenfromhustle",
    title: "Home | Havenfromhustle",
    imageUrl:
      "https://static.wixstatic.com/media/7f9ff0_280086bf2a244f8ca18bb5f08c0d8196~mv2.png/v1/fill/w_157,h_103,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/image.png",
  },
  {
    url: "https://ohadavrahami.wixsite.com/asael",
    title: "Home | Asael",
    imageUrl:
      "https://static.wixstatic.com/media/722022_38ea12d4e4b7440f93f0241153502cae~mv2.jpeg/v1/fill/w_467,h_735,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/WhatsApp%20Image%202020-08-18%20at%2013_02_06_jp.jpeg",
  },
  {
    url: "https://butterfly-button.com/",
    title: "Home - HE - The Butterfly Button",
    imageUrl:
      "https://www.butterfly-button.com/wp-content/uploads/2023/04/Side-big.png",
  },
  {
    url: "https://www.zenetude.ca/",
    title: "Zenetude | yoga",
    imageUrl:
      "https://static.wixstatic.com/media/2967ec_b3cee8ba0b1840bea5947cb67f436306~mv2.gif",
  },
  {
    url: "https://www.nappyvegan.com/",
    title: "Home | Nappy Vegan 100% Natural Products",
    imageUrl:
      "https://static.wixstatic.com/media/6b417a_795bfda646e44c72a28506153726a1f2%7Emv2.jpg/v1/fit/w_2500,h_1330,al_c/6b417a_795bfda646e44c72a28506153726a1f2%7Emv2.jpg",
  },
  {
    url: "https://www.senecar7.com/",
    title: "District | SR-7 School District",
    imageUrl:
      "https://static.wixstatic.com/media/c7103c_7214ddb8aa534850996feedfc084974c%7Emv2.png/v1/fit/w_2500,h_1330,al_c/c7103c_7214ddb8aa534850996feedfc084974c%7Emv2.png",
  },
  {
    url: "https://www.lucky78.in/",
    title: "https://www.lucky78.in/",
    imageUrl: "",
  },
  {
    url: "https://ohadavrahami.wixsite.com/testappohstores",
    title: "Home",
    imageUrl:
      "https://static.wixstatic.com/media/4fae05_18a08c79702d480a90ac2a0e87bf99d1~mv2.png/v1/fill/w_200,h_200,al_c,q_85,blur_3,enc_avif,quality_auto/butterfly-logo-200.png",
  },
  {
    url: "https://doirnoir133.wixsite.com/ghosts-of-salvation",
    title: "Home | Ghosts Of Salvation",
    imageUrl:
      "https://static.wixstatic.com/media/30eefe_32a4678f676f4e1eb3cb6c0180f373dd~mv2.png/v1/fill/w_59,h_60,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/the.png",
  },
  {
    url: "https://www.theparanormalisreal.com/",
    title:
      "The Paranormal is Real | True Haunting Series & Paranormal Gift Shop",
    imageUrl:
      "https://static.wixstatic.com/media/ed56b8_d8b06c1e77df4582af0166db4b57d0fd~mv2.png/v1/fill/w_1920,h_1080,al_c/ed56b8_d8b06c1e77df4582af0166db4b57d0fd~mv2.png",
  },
  {
    url: "http://abcapital.co.il",
    title: "����� ����� | ����� ������ | ����� | Hosting",
    imageUrl: "",
  },
  {
    url: "https://perseflora.wixsite.com/jupiterhousegoods",
    title: "welcome | Jupiter House Goods",
    imageUrl:
      "https://static.wixstatic.com/media/593151_081474b3931343d8b3ed66c758d9eb15%7Emv2.jpg/v1/fit/w_2500,h_1330,al_c/593151_081474b3931343d8b3ed66c758d9eb15%7Emv2.jpg",
  },
  {
    url: "https://alena21shulmantm.wixstudio.io/my-site-20",
    title: "Home | My Site 20",
    imageUrl:
      "https://static.wixstatic.com/media/84770f_41054e86759e4a23b55f56760a8bc7d5f000.jpg/v1/fill/w_160,h_90,al_c,q_80,usm_0.66_1.00_0.01,blur_3,enc_avif,quality_auto/84770f_41054e86759e4a23b55f56760a8bc7d5f000.jpg",
  },
  {
    url: "https://enterprisessahil85.wixsite.com/kinderzy",
    title: "Home | Kinderzy",
    imageUrl:
      "https://static.wixstatic.com/media/b31a6f_c608121fb32349268430894566b7aa11~mv2.png/v1/fill/w_171,h_80,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/SAHIL%20ENTERPRISE_free-file.png",
  },
  {
    url: "https://theeliteclubza.wixsite.com/my-site",
    title: "Home | My Site",
    imageUrl:
      "https://static.wixstatic.com/media/414ac2_de9cc184da9d416fa47385c0411d8599~mv2.png/v1/fill/w_45,h_25,al_c,q_85,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/414ac2_de9cc184da9d416fa47385c0411d8599~mv2.png",
  },
  {
    url: "https://alexanderr28.wixsite.com/my-site-440",
    title: "HOME | My Site 440",
    imageUrl:
      "https://static.wixstatic.com/media/4fae05_18a08c79702d480a90ac2a0e87bf99d1~mv2.png/v1/fill/w_200,h_200,al_c,q_85,blur_3,enc_avif,quality_auto/butterfly-logo-200.png",
  },
  {
    url: "https://www.eyesofmanycommunity.com/",
    title: "EYES OF MANY CIC | COMMUNITY | London, UK",
    imageUrl:
      "https://static.wixstatic.com/media/61cf3e_3425aae52812418f8fb0afbb4a95c120%7Emv2.png/v1/fit/w_2500,h_1330,al_c/61cf3e_3425aae52812418f8fb0afbb4a95c120%7Emv2.png",
  },
  {
    url: "https://www.iasflightschool.com/",
    title:
      "IAS Flight School | Miami | Miami Executive Airport 0 comments0 comments0 comments",
    imageUrl:
      "https://static.wixstatic.com/media/bd171e_0a5a79bac78e41538786d47a505ef902%7Emv2.png/v1/fit/w_2500,h_1330,al_c/bd171e_0a5a79bac78e41538786d47a505ef902%7Emv2.png",
  },
  {
    url: "https://cerys35.wixsite.com/disabilityartscymru",
    title: "Home | Disability Arts Cymru",
    imageUrl:
      "https://static.wixstatic.com/media/798761_d31f1dbb128246028681fe048f90d345%7Emv2.jpg/v1/fit/w_2500,h_1330,al_c/798761_d31f1dbb128246028681fe048f90d345%7Emv2.jpg",
  },
  {
    url: "https://www.opmhs.com/",
    title:
      "Your mind, our concern | Optimum Mental Health Services | 15 S Grady Way Ste 625, Renton, WA 98057",
    imageUrl:
      "https://static.wixstatic.com/media/6d9ecc_8a681e662a4a440ca633bdb652fb7635%7Emv2.png/v1/fit/w_2500,h_1330,al_c/6d9ecc_8a681e662a4a440ca633bdb652fb7635%7Emv2.png",
  },
  {
    url: "https://katcherss.wixsite.com/adxc",
    title: "ADXC OFFICIAL WEBSITE",
    imageUrl:
      "https://static.wixstatic.com/media/621a4b_56b75fcc36f44c048668df50bb41ca6c%7Emv2.jpg/v1/fit/w_2500,h_1330,al_c/621a4b_56b75fcc36f44c048668df50bb41ca6c%7Emv2.jpg",
  },
  {
    url: "https://zunmycl1717.wixsite.com/reposteria",
    title: "Inicio | Reposteria",
    imageUrl:
      "https://static.wixstatic.com/media/56a0809e4c97404291a848762fdd6e58.jpg/v1/fill/w_288,h_288,al_c,q_80,usm_0.66_1.00_0.01,blur_2,enc_avif,quality_auto/56a0809e4c97404291a848762fdd6e58.jpg",
  },
  {
    url: "https://www.abraham.travel/",
    title: "Abraham official website – Hostels & Tours",
    imageUrl:
      "https://www.abraham.travel/wp-content/uploads/2022/08/Abraham-general-1-white-line-300.png",
  },
  {
    url: "https://sysdesign3.wixsite.com/my-site-3",
    title: "Start | My Site 3",
    imageUrl: "https://www.wix.com/favicon.ico",
  },
];
