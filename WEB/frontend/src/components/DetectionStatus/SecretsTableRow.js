import { Stack, Link, Typography, TableCell, TableRow } from '@mui/material';
import { red, green } from '@mui/material/colors';

import { VscGistSecret, VscPreview } from 'react-icons/vsc';

import ScrapButton from './ScrapButton';

function CategorizedIcon({ isLeaked, isFakenews }) {
  if (isFakenews) return <VscGistSecret color={red[500]} size={24} />;
  else if (isLeaked) return <VscPreview color={red[500]} size={24} />;
  else return <VscPreview color={green[500]} size={24} />;
}

export default function SecretsTableRow({
  article,
  showDetailModal,
  scrapArticle,
  isAlreadyScrapped,
}) {
  const {
    _id,
    title,
    category,
    summarized,
    author,
    href,
    true_score,
    isLeaked,
    isFakenews,
  } = article;

  return (
    <TableRow
      key={_id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        <Link href={href} underline="hover">
          <CategorizedIcon isLeaked={isLeaked} isFakenews={isFakenews} />
        </Link>
      </TableCell>
      <TableCell
        align="left"
        onClick={() => showDetailModal(_id)}
        style={{ cursor: 'pointer' }}
      >
        <Stack spacing={1.2}>
          <Typography
            sx={{ fontFamily: 'Noto sans KR', fontSize: '1.15rem' }}
            style={{ fontWeight: 'bold' }}
            color="textPrimary"
          >
            {title}
          </Typography>
          <Typography color="textSecondary" sx={{ fontSize: '1.1rem' }}>
            {summarized}
          </Typography>
        </Stack>
      </TableCell>
      <TableCell align="center">
        <Typography variant="body1">{author}</Typography>
      </TableCell>
      <TableCell align="center">
        <ScrapButton
          handleScrap={() => scrapArticle(_id)}
          isAlreadyScrapped={isAlreadyScrapped}
        />
      </TableCell>
    </TableRow>
  );
}
