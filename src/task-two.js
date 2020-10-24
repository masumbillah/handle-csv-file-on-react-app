import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function TaskTwo(props) {
  const classes = useStyles();
  let getLocalData = localStorage.getItem("collection"),
      dataList = getLocalData? JSON.parse(getLocalData):[];

  const [collectionData, setCollectionData] = React.useState(dataList);

  useEffect(() => {
    setCollectionData(dataList);
  }, [props]);

  return (
     <Container maxWidth="lg">
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Project Name</TableCell>
            <TableCell>Project description</TableCell>
            <TableCell>Client</TableCell>
            <TableCell>Contractor</TableCell>
            <TableCell align="right">Max X</TableCell>
            <TableCell align="right">Min X</TableCell>
            <TableCell align="right">Max Y</TableCell>
            <TableCell align="right">Min Y</TableCell>
            <TableCell align="right">Max Z</TableCell>
            <TableCell align="right">Min Z</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {collectionData.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row"> {row && row.pName} </TableCell>
              <TableCell component="th" scope="row"> {row && row.pDescription} </TableCell>
              <TableCell component="th" scope="row"> {row && row.client} </TableCell>
              <TableCell component="th" scope="row"> {row && row.contractor} </TableCell>
              <TableCell align="right">{row && row.maxX}</TableCell>
              <TableCell align="right">{row && row.minX}</TableCell>
              <TableCell align="right">{row && row.maxY}</TableCell>
              <TableCell align="right">{row && row.minY}</TableCell>
              <TableCell align="right">{row && row.maxZ}</TableCell>
              <TableCell align="right">{row && row.minZ}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  );
}