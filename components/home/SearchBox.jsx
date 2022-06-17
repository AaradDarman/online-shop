import React from "react";

const SearchBox = () => {
  return (
    <div className="search_box">
      <form method="get" action="https://digimovie.one" autoComplete="off">
        <input
          className="str_search_ajax"
          type="text"
          name="s"
          placeholder="جستجو کنید . . . "
        />
        <button type="submit">
          <svg className="icon icon_search">
            <use href="#search"></use>
          </svg>
        </button>
      </form>
      <div className="search_result" style="display: block;">
        <ul>
          <li>
            <div className="text_adv_se">
              <a href="https://digimovie.one/gamer-2009/">
                <h3 className="title lato_font">Gamer 2009</h3>
              </a>
              <div className="genres">اکشن,علمی تخیلی,هیجان انگیز</div>
            </div>
            <div className="cover">
              <a
                title="دانلود فیلم Gamer 2009"
                href="https://digimovie.one/gamer-2009/"
              >
                <img
                  width={150}
                  height={150}
                  src="https://cdn-cloudflare.top/wp-content/uploads/2022/05/MV5BMTkzMDU0NTg3MF5BMl5BanBnXkFtZTcwNzU1MjU1Mg@@._V1_SX500-150x150.jpg"
                  className="attachment-thumbnail size-thumbnail wp-post-image"
                  alt="دانلود فیلم Gamer 2009 با زیرنویس فارسی چسبیده"
                  loading="lazy"
                />
              </a>
            </div>
            <div className="rate_container lato_font">
              <svg className="icon icon_emptystar">
                <use href="#emptystar"></use>
              </svg>
              <span>5.7</span>
            </div>
          </li>
        </ul>
        <a
          className="btnShowAllResult"
          title="مشاهده همه نتایج"
          href="https://digimovie.one/?s=game"
        >
          مشاهده همه نتایج
        </a>
        <div className="nores">جستجوی شما با نتیجه ای همراه نبود.</div>
      </div>
    </div>
  );
};

export default SearchBox;
