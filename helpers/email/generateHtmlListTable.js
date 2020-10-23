function generateHtmlJobList(jobs) {
  let htmlList = '';
  jobs.forEach((job) => {
    htmlList += `
    <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="92%" style="
        padding-top: 0;
        padding-bottom: 16px;
        margin-left: 24px;
        margin-right: 24px;
        border-bottom: 1px
        solid #d9d9d9;
      ">
      <tbody>
        <tr>
          <!-- <td width="32" style="
                  width: 32px;
                  padding-right: 0;
                ">
              <img
                src="https://localhost"
                alt="ThoughtWorks" border="0" width="32" style="
                    outline: none;
                    color: #ffffff;
                    text-decoration: none;
                  " class="CToWUd" />
          </td> -->
          <td align="left" style="
                padding-left: 25px;
                text-align: left;
              ">
            <a href="http://localhost:3000" style="
                  color: #0073b1;
                  display: inline-block;
                  text-decoration: none;
                " target="_blank">
              <table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%"
                style="
                    margin: 0
                    auto;
                    table-layout: fixed;
                    width: 100%;
                    border-collapse: separate;
                    border-spacing: 2px;
                  ">
                <tbody>
                  <tr>
                    <td style="
                          padding-bottom: 6px;
                        ">
                      ${job.title}
                    </td>
                  </tr>
                  <tr>
                    <td style=" padding-bottom: 6px; ">
                      <p style=" margin: 0; color: #737373; font-weight: 400; font-size: 12px;
                      line-height: 1.333; ">
                        ${job.company}
                        · ${job.isRemote ? 'Remoto' : job.workplace}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td width=" 24" style="
                          display: inline-block;
                          width: 24px;
                        ">
                      <img
                        src="https://ci6.googleusercontent.com/proxy/OYPADMi3F49HQwAHDWND5tzSK94r57IFOgznggdkLrRY90QFEQuJacqLx5r3xzUfe-lShRebLdoouAa8vRzYAROthPYpeD4WPO7jD1afgIquR9a1OdcvRssousCRNxZ3bxL9Y_XmAcYFgMDQkHwKeMBOFHbdYmZZkzhgbQkXCus0kABaC_6YBcPdz8A6DiJeOgjQAxsVRdp03MecJlyAXdGKkjyCM0Qzpw_JqZQCoqyNcshCpISXMOs35Qz3PLpOn-ut9A6liVYsE-i5Vma8IIpJz85lzOL3FcFdN1XcXYU=s0-d-e1-ft#https://static.licdn.com/sc/p/com.linkedin.email-assets-frontend%3Aemail-assets-frontend-static-content%2B__latest__/f/%2Femail-assets-frontend%2Fimages%2Femail%2Ficons%2Ficon_green_radar_screen_24x24.png"
                        border="0" alt="" width="24" height="24" style="
                          outline: none;
                          color: #ffffff;
                          text-decoration: none;
                        " class="CToWUd" />
                    </td>
                    <td style="
                          padding: 4px
                            16px
                            0px
                            8px;
                          white-space: normal;
                          display: inline-block;
                        ">
                      <p style="
                            margin: 0;
                            color: #737373;
                            font-weight: 400;
                            font-size: 12px;
                            line-height: 1.333;
                          ">
                        Recrutando
                        agora
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </a>
          </td>
        </tr>
      </tbody>
    </table>`;
  });
  return htmlList;
}

module.exports = {
  generateHtmlJobList,
};
