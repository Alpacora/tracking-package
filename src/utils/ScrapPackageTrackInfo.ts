import axios from "axios";
import cheerio from "cheerio";

interface ITrack {
  status: string;
  data: string;
  hora?: string;
  origem?: string;
  destino?: string;
  local: string;
}

export const ScrapPackageTrackInfo = async (code: string) => {
  const track = await axios.get(`https://www.linkcorreios.com.br/${code}`);

  const data = <ITrack[]>[];

  const html = cheerio.load(track.data);
  html('ul.linha_status').each((_, element) => {
    let map: ITrack = { status: '', local: '', data: '' };

    html(element).find('li').each((_, element) => {
      const foundedText = html(element).text().replace(/\s\s+/g, ' ');

      map = {
        status: foundedText.includes('Status') ? foundedText.replace('Status: ', '') : map.status,
        data: foundedText.includes('Data') ? foundedText : map.data,
        local: foundedText.includes('Local') ? foundedText.replace('Local: ', '') : map.local,
      }
    })

    data.push(map);
  });

  data.shift();

  return {
    code: code,
    packageInfo: data
  };
}
