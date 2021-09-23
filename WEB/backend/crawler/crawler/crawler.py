# for scrapping
import requests
from bs4 import BeautifulSoup as bs

# for multiprocess
import asyncio
import aiohttp

# for checking elapesed time
import time

"""
일단 이 방법은 코드 복붙에 준하나, 지금 더 fancy한 방법을 연구하기엔 시간이 없으므로...
프로그램의 크기가 커지면 필연적으로 이곳을 수정할 것이고
그때는 무조건 해결해내야 한다.
"""
if __name__ == '__main__':
    # for unit test
    # from config import jsonServer as js

    # from model import Content as ct
    # from model import NaverListPage as nlp
    # from model import NaverNewsPage as nnp

    # import const as const
    # import db as database
    pass
else:
    # for run at main.py
    from crawler.config import jsonServer as js

    from crawler.model import Content as ct
    # from crawler.model import NaverListPage as nlp
    # from crawler.model import NaverNewsPage as nnp
    # from crawler.model.NaverNewsSite import NaverNewsListPage as navernews_listpage
    # from crawler.model.NaverNewsSite import NaverNewsContentsPage as navernews_contentspage
    from crawler.model.NaverNewsSite import NaverNewsSite as naver

    from crawler.model.siteInstanceServer import get_siteInstance_list


    import crawler.const as const
    import crawler.db as database

def site_instance_selector(site):
    return get_siteInstance_list()[site]

async def crawl_manager(site):
    start_time = time.time()
    await asyncio.gather(site_instance_selector(site).crawl())
    end_time = time.time()
    print(f'time taken crawling "{site}": {end_time - start_time}')

"""
현재 생각하는 flow
'Naver'같은 이름으로 site_instance_selector이용
get_instance_list에서 받아온 'Naver': NaverClass 와 같은 딕셔너리를 통해
직접 클래스 인스턴스(NaverClass) 에 crawl()명령을 내림

각각 사이트별 클래스에는
목록 사이트
컨텐츠 사이트
2가지가 있음

목록 사이트에 대한 접근은 url조작을 통해
컨텐츠 사이트에 대한 접근은
목록 사이트에서 태그/클래스 를 통한 스크래핑을 통해 접근

컨텐츠 사이트에서 내용을 읽어내는 것 역시
태그/클래스 식별을 통한 스크래핑이다.

새로운 사이트를 만든다면
1.
model 내부에 Naver.py 같은 파일을 만들고
그 안에 목록 사이트, 컨텐츠 사이트에 대한 것을 ListPage.py, NewsPage.py를 상속하여
구현 (이름은 뉴스에 국한되지 않을 것이므로 변경할 예정)

2.
config 내부에 generator.py에
태그/클래스를 기술하여 generator실행

3.
사이트 구조 및 url이 변경된다면 model을 수정
html 및 class 이름이 변경된다면 config.generator를 통해 수정
"""