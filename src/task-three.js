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
import { jsPDF } from "jspdf";

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

  const downloadToPdf = (e) => {
    let doc = new jsPDF('p', 'pt', 'a4');

    doc.html(source, {
      callback: function (pdf) {
        doc.save("abc-company-collection-data.pdf"); 
      }
    });

  };


const dynamicDataRow = () => {
  let tr = "";
  collectionData.forEach(row=>{
   let newTr = `<tr key={row.id}>
              <td style="min-width: 80px;"> ${row && row.pName} </td>
              <td style="min-width: 80px;"> ${row && row.pDescription} </td>
              <td style="min-width: 40px;"> ${row && row.client} </td>
              <td style="min-width: 40px;"> ${row && row.contractor} </td>
              <td style="min-width: 40px;" align="right">${row && row.maxX}</td>
              <td style="min-width: 40px;" align="right">${row && row.minX}</td>
              <td style="min-width: 40px;" align="right">${row && row.maxY}</td>
              <td style="min-width: 40px;" align="right">${row && row.minY}</td>
              <td style="min-width: 40px;" align="right">${row && row.maxZ}</td>
              <td style="min-width: 40px;" align="right">$${row && row.minZ}</td>
            </tr>`
            tr +=newTr;
  })

  return tr;
};

let source = `
<!DOCTYPE html>
<html>
<body style="margin: 0 auto; text-align: center; padding: 10px 15px;">
 <table style="width:100%; font-size:10px; margin:10px auto; padding-left: 10px;">
  <tr style="border-bottom: 1px solid;">
    <th style="min-width: 80px; padding-bottom:5px;" >Project Name</th>
    <th style="min-width: 90px; padding-bottom:5px;">Project Description</th> 
    <th style="min-width: 40px; padding-bottom:5px;">Client</th>
    <th style="min-width: 40px; padding-bottom:5px;">Contractor</th>
    <th style="min-width: 40px; padding-bottom:5px;">Max X</th>
    <th style="min-width: 40px; padding-bottom:5px;">Min X</th>
    <th style="min-width: 40px; padding-bottom:5px;">Max Y</th>
    <th style="min-width: 40px; padding-bottom:5px;">Min Y</th>
    <th style="min-width: 40px; padding-bottom:5px;">Max Z</th>
    <th style="min-width: 40px; padding-bottom:5px;">Min Z</th>
  </tr>
  ${dynamicDataRow()}
</table>

</body>
</html>`;


  return (
     <Container maxWidth="lg" style={{position: 'relative'}} >
     <span alt="Download" onClick={(e)=>downloadToPdf(e)} className="download-link" style={{position: 'absolute', right: 40, top: -40, cursor:'pointer'}} >Download pdf</span>
     <div id="pdfContainer">
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
    </div>
    </Container>
  );
}
