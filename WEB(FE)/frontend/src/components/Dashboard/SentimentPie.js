import { ResponsivePie } from '@nivo/pie';
import {
  Card,
  CardHeader,
  CardContent,
  Box,
  LinearProgress,
  Divider,
  Typography,
} from '@mui/material';
import useFetch from '../../hooks/useFetch';

import { isEmpty } from 'lodash';

export const SentimentPie = ({ theme, colors }) => {
  const requestUrl =
    process.env.REACT_APP_USE_STATIC_RESPONSE == 'True'
      ? `/static/data/sentimentPie.json`
      : `/api/nlp/sentiment/pie/`;
  const { data, error, isPending } = useFetch(requestUrl, {
    method: 'GET',
  });

  return (
    <Card style={{ height: '400px' }}>
      <CardHeader title="감정 통계" />
      <Divider />
      {isPending ? (
        <Box sx={{ width: '100%', color: 'grey.500' }}>
          <LinearProgress color="inherit" />
        </Box>
      ) : error ? (
        <Box sx={{ width: '100%', color: 'grey.500' }}>
          <LinearProgress color="inherit" />
        </Box>
      ) : !isEmpty(data.response) ? (
        <CardContent>
          <Box
            sx={{
              height: 350,
              position: 'relative',
            }}
          >
            <ResponsivePie
              theme={theme}
              data={data.response}
              margin={{ top: 0, right: 80, bottom: 100, left: 80 }}
              innerRadius={0.5}
              padAngle={0.7}
              cornerRadius={3}
              activeOuterRadiusOffset={8}
              colors={colors}
              borderWidth={1}
              borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
              arcLinkLabelsSkipAngle={10}
              arcLinkLabelsThickness={2}
              arcLabelsSkipAngle={10}
              legends={[
                {
                  anchor: 'bottom',
                  direction: 'row',
                  justify: false,
                  translateX: 0,
                  translateY: 56,
                  itemsSpacing: 0,
                  itemWidth: 80,
                  itemHeight: 18,
                  itemDirection: 'left-to-right',
                  itemOpacity: 1,
                  symbolSize: 18,
                  symbolShape: 'circle',
                  effects: [
                    {
                      on: 'hover',
                      style: {
                        itemTextColor: '#000',
                      },
                    },
                  ],
                },
              ]}
            />
          </Box>
        </CardContent>
      ) : (
        <CardContent>
          <Typography>현재 데이터가 존재하지 않습니다.</Typography>
        </CardContent>
      )}
    </Card>
  );
};

export default SentimentPie;
