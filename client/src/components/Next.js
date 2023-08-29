import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CSVLink } from 'react-csv';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';


const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: '20px',
  },
  header: {
    marginBottom: '10px',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  table: {
    display: 'table',
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCellHeader: {
    padding: '5px',
    backgroundColor: '#f2f2f2',
    fontWeight: 'bold',
    border: '1px solid #ddd',
  },
  tableCell: {
    padding: '5px',
    border: '1px solid #ddd',
  },
});

const Next = () => {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response1 = await axios.get('http://localhost:2000/api/all/rooms');
      console.log('Response1:', response1.data); // Check the data in the console
      setData1(response1.data);

      const response2 = await axios.get('http://localhost:2000/api/all/prevstudents');
      console.log('Response2:', response2.data); // Check the data in the console
      setData2(response2.data);

      setLoading(false);
    } catch (error) {
      setError('Error fetching data');
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!Array.isArray(data1) || !Array.isArray(data2)) {
    return <div>Data is not in the expected format</div>;
  }

  const finalData = data1.map((row, index) => ({
    ...row,
    name: data2[index]?.name || '',
    semester: data2[index]?.semester || '',
    grade: data2[index]?.grade || '',
    rollno: data2[index]?.rollno || '',
  }));
  

  const headers = [
    { label: 'ROOM NO.', key: 'roomno' },
    { label: 'ROOM TYPE', key: 'roomtype' },
    { label: 'NAME', key: 'name' },
    { label: 'SEMESTER', key: 'semester' },
    { label: 'GRADE', key: 'grade' },
    { label: 'Roll No', key: 'rollno' },
  ];

  const PDFDocument = ({ data, headers }) => (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.header}>FINAL LIST - PDF</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            {headers.map((header, index) => (
              <View key={index} style={[styles.tableCellHeader, { flex: header.flex || 1 }]}>
                <Text>{header.label}</Text>
              </View>
            ))}
          </View>
          {data.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.tableRow}>
              {headers.map((header, columnIndex) => (
                <View key={columnIndex} style={[styles.tableCell, { flex: header.flex || 1 }]}>
                  <Text>{row[header.key]}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
  


  return (
    <div style={{ textAlign: 'center', margin: '0 auto', maxWidth: '800px' }}>
      
      <h1>FINAL LIST</h1>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
        <CSVLink data={finalData} headers={headers} filename={"final_list.csv"}>
          <button className="btn btn-success" style={{ marginRight: '10px' }}>Download CSV</button>
        </CSVLink>
        <PDFDownloadLink document={<PDFDocument data={finalData} headers={headers} />} fileName="final_list.pdf">
          {({ blob, url, loading, error }) =>
            loading ? 'Loading document...' : <button className="btn btn-success">Download PDF</button>
          }
        </PDFDownloadLink>
      </div>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
          <th style={tableHeaderStyle}>S.NO.</th>
            <th style={tableHeaderStyle}>ROOM NO.</th>
            <th style={tableHeaderStyle}>ROOM TYPE</th>
            <th style={tableHeaderStyle}>NAME</th>
            <th style={tableHeaderStyle}>Roll No</th>
            <th style={tableHeaderStyle}>SEMESTER</th>
            <th style={tableHeaderStyle}>GRADE</th>
            
          </tr>
        </thead>
        <tbody>
          {data1.map((row, index) => (
            <tr key={index}>
              {data2[index] && (
                <>
                 <td style={tableCellStyle}>{index + 1}</td>
                  <td style={tableCellStyle}>{row.roomno}</td>
                  <td style={tableCellStyle}>{row.roomtype}</td>
                  <td style={tableCellStyle}>
                    {data2[index].name}
                  </td>
                  <td style={tableCellStyle}>
                    {data2[index].rollno}
                  </td>
                  <td style={tableCellStyle}>
                    {data2[index].semester}
                  </td>
                  <td style={tableCellStyle}>
                    {data2[index].grade}
                  </td>
                  
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
};

const tableHeaderStyle = {
  backgroundColor: '#f2f2f2',
  padding: '10px',
  border: '1px solid #ddd',
};

const tableCellStyle = {
  padding: '10px',
  border: '1px solid #ddd',
};

export default Next;