from crawler.model.Site import *
from crawler.model.naver.const import *

class NaverNewsListPage(listpage):
    def __init__(self):
        listpage.__init__(self, '/naver')

    # override
    def get_each_urlbases(self):
        date = datetime.today()
        date_format = date.strftime("%Y%m%d")
        # 맨 뒤에 페이지 번호 숫자(1~9999등)을 붙여 페이지를 이동하기 위함.
        each_urlbases = [NAVER_BASE] * const.CRAWL_DATEAMOUNT

        for i in range(const.CRAWL_DATEAMOUNT):
            each_urlbases[i] += f"&date={date_format}&page="
            date -= timedelta(days=1)
            date_format = date.strftime("%Y%m%d")

        return each_urlbases

    def get_contents_urls(self, soup):
        """
        page 안에서 뉴스들의 url을 찾아 리스트 형태로 리턴하는 함수
        """
        ret = []
        div = soup.find(self.list_div, class_ = self.list_div_class)
        """
        일단은 사진에 붙어있는 링크를 이용하는 방법.
        즉, 사진이 없으면 링크가 없음.
        근데 사진이 없는 경우에 대한 예외처리가 있음 ㅋㅋ
        사진 없으면 작동을 안한다는건데, 모르겠다 아직
        """
        for dt in div.find_all("dt", class_="photo"):
            href = dt.find('a')['href']
            ret.append(href)

        return ret


class NaverNewsContentsPage(contentspage):
    def __init__(self):
        contentspage.__init__(self, '/naver')


class NaverNewsSite(Site):
    def __init__(self):
        self.name = 'naver_news'
        self.listpage = NaverNewsListPage()
        self.contentspage = NaverNewsContentsPage()
        self.header = NAVER_CUSTOM_HEADER