import React, { Component } from 'react'

class CourseTable extends Component {
    render() {
        return (
            <div>
                <table align="center" border="1" cellSpacing="0" cellPadding="3" bgcolor="#F1F1FD" style={{overflowX: 'scroll'}}>
                    <tbody>
                    <tr bgcolor="#EA98FF"><td><b>Day</b></td><td colSpan="4" width="60px"><b>8:00</b></td><td colSpan="4" width="60px"><b>9:00</b></td><td colSpan="4" width="60px"><b>10:00</b></td><td colSpan="4" width="60px"><b>11:00</b></td><td colSpan="4" width="60px"><b>12:00</b></td><td colSpan="4" width="60px"><b>13:00</b></td><td colSpan="4" width="60px"><b>14:00</b></td><td colSpan="4" width="60px"><b>15:00</b></td><td colSpan="4" width="60px"><b>16:00</b></td><td colSpan="4" width="60px"><b>17:00</b></td></tr>
                    <tr><td bgcolor="#EA98FF" rowSpan="1" align="center"><b>M</b></td><td colSpan="8" height="50px" bgcolor="#F4D9FF"><table width="100%"><tbody><tr><td valign="top">141213101&nbsp;</td><td valign="top" align="right">S.14&nbsp;</td></tr><tr><td><font size="-2">57140214-2RA-R&nbsp;</font></td><td align="right"><font size="-2">**21-BA 507&nbsp;</font></td></tr></tbody></table></td><td colSpan="8" height="50px" bgcolor="#F4D9FF"><table width="100%"><tbody><tr><td valign="top">141213101&nbsp;</td><td valign="top" align="right">L.14&nbsp;</td></tr><tr><td><font size="-2">57140214-2RA-R&nbsp;</font></td><td align="right"><font size="-2">**21-BA 507&nbsp;</font></td></tr></tbody></table></td><td colSpan="24" height="50px">&nbsp;</td></tr>
                    <tr><td bgcolor="#EA98FF" rowSpan="1" align="center"><b>T</b></td><td colSpan="40" height="50px">&nbsp;</td></tr>
                    <tr><td bgcolor="#EA98FF" rowSpan="1" align="center"><b>W</b></td><td colSpan="8" height="50px" bgcolor="#F4D9FF"><table width="100%"><tbody><tr><td valign="top">141213101&nbsp;</td><td valign="top" align="right">S.10&nbsp;</td></tr><tr><td><font size="-2">57140314-2RA-R&nbsp;</font></td><td align="right"><font size="-2">**21-BA 604&nbsp;</font></td></tr></tbody></table></td><td colSpan="8" height="50px" bgcolor="#F4D9FF"><table width="100%"><tbody><tr><td valign="top">141213101&nbsp;</td><td valign="top" align="right">L.10&nbsp;</td></tr><tr><td><font size="-2">57140314-2RA-R&nbsp;</font></td><td align="right"><font size="-2">**21-BA 604&nbsp;</font></td></tr></tbody></table></td><td colSpan="4">&nbsp;</td><td colSpan="8" height="50px" bgcolor="#F4D9FF"><table width="100%"><tbody><tr><td valign="top">141213101&nbsp;</td><td valign="top" align="right">S.12&nbsp;</td></tr><tr><td><font size="-2">57140314-2RC-R&nbsp;</font></td><td align="right"><font size="-2">**21-BA 602&nbsp;</font></td></tr></tbody></table></td><td colSpan="8" height="50px" bgcolor="#F4D9FF"><table width="100%"><tbody><tr><td valign="top">141213101&nbsp;</td><td valign="top" align="right">L.12&nbsp;</td></tr><tr><td><font size="-2">57140314-2RC-R&nbsp;</font></td><td align="right"><font size="-2">**21-BA 602&nbsp;</font></td></tr></tbody></table></td><td colSpan="4" height="50px">&nbsp;</td></tr>
                    <tr><td bgcolor="#EA98FF" rowSpan="1" align="center"><b>H</b></td><td colSpan="8" height="50px" bgcolor="#F4D9FF"><table width="100%"><tbody><tr><td valign="top">141213204&nbsp;</td><td valign="top" align="right">S.1&nbsp;</td></tr><tr><td><font size="-2">57140214-3RA-R&nbsp;</font></td><td align="right"><font size="-2">**21-BA 505&nbsp;</font></td></tr></tbody></table></td><td colSpan="8" height="50px" bgcolor="#F4D9FF"><table width="100%"><tbody><tr><td valign="top">141213204&nbsp;</td><td valign="top" align="right">L.1&nbsp;</td></tr><tr><td><font size="-2">57140214-3RA-R&nbsp;</font></td><td align="right"><font size="-2">**21-BA 505&nbsp;</font></td></tr></tbody></table></td><td colSpan="24" height="50px">&nbsp;</td></tr>
                    <tr><td bgcolor="#EA98FF" rowSpan="1" align="center"><b>F</b></td><td colSpan="8" height="50px" bgcolor="#F4D9FF"><table width="100%"><tbody><tr><td valign="top">141213202&nbsp;</td><td valign="top" align="right">S.1&nbsp;</td></tr><tr><td><font size="-2">57140214-2RA-R&nbsp;</font></td><td align="right"><font size="-2">**21-BA 505&nbsp;</font></td></tr></tbody></table></td><td colSpan="8" height="50px" bgcolor="#F4D9FF"><table width="100%"><tbody><tr><td valign="top">141213202&nbsp;</td><td valign="top" align="right">L.1&nbsp;</td></tr><tr><td><font size="-2">57140214-2RA-R&nbsp;</font></td><td align="right"><font size="-2">**21-BA 505&nbsp;</font></td></tr></tbody></table></td><td colSpan="24" height="50px">&nbsp;</td></tr>
                    </tbody>
                </table>
                <hr style={{margin: '1.5em 0px'}}/>
                <table border="0" cellPadding="3" cellSpacing="1">
                    <tbody>
                        <tr>
                			<td><b>รหัสวิชา</b></td>
                			<td><b>ชื่อวิชา</b></td>
                			<td><b>หน่วยกิต(ชั่วโมง)</b></td>
                		</tr>
            			<tr>
            				<td>141213101</td>
            				<td>COMPUTER AND INFORMATION TEC</td>
            				<td>3(2-2)</td>
            			</tr>
            			<tr>
            				<td>141213204</td>
            				<td>SYSTEMS ANALYSIS AND DESIGN</td>
            				<td>3(2-2)</td>
            			</tr>
            			<tr>
            				<td>141213202</td>
            				<td>COMPUTER PROGRAMMING</td>
            				<td>3(2-2)</td>
            			</tr>
                	</tbody>
            	</table>
	    </div>
        );
    }
}

export default CourseTable;
