using System;
using System.Collections.Generic;
using System.Windows.Forms;

namespace LoadCalculator
{
    public partial class CalculationOptionsDialog : Form
    {
        public CalculationOptions CalculationOptions { get; private set; } = new CalculationOptions();

        private ComboBox buildingTypeCombo;
        private ComboBox voltageCombo;
        private ComboBox codeEditionCombo;
        private CheckBox includeReceptaclesCheck;
        private CheckBox applyDemandFactorsCheck;
        private CheckBox useCustomFactorsCheck;
        private Button okButton;
        private Button cancelButton;
        private GroupBox demandFactorsGroup;
        private TextBox lightingFactorText;
        private TextBox receptacleFactorText;
        private TextBox hvacFactorText;

        public CalculationOptionsDialog()
        {
            InitializeComponent();
            LoadDefaults();
        }

        private void InitializeComponent()
        {
            this.Text = "Load Calculation Options";
            this.Size = new System.Drawing.Size(450, 500);
            this.StartPosition = FormStartPosition.CenterParent;
            this.FormBorderStyle = FormBorderStyle.FixedDialog;
            this.MaximizeBox = false;
            this.MinimizeBox = false;

            int yPos = 20;

            // Building Type
            var buildingTypeLabel = new Label
            {
                Text = "Building Type:",
                Location = new System.Drawing.Point(20, yPos),
                Size = new System.Drawing.Size(100, 20)
            };
            
            buildingTypeCombo = new ComboBox
            {
                Location = new System.Drawing.Point(130, yPos),
                Size = new System.Drawing.Size(200, 25),
                DropDownStyle = ComboBoxStyle.DropDownList
            };
            buildingTypeCombo.Items.AddRange(Enum.GetNames(typeof(BuildingType)));
            buildingTypeCombo.SelectedIndex = 0;

            yPos += 40;

            // System Voltage
            var voltageLabel = new Label
            {
                Text = "System Voltage:",
                Location = new System.Drawing.Point(20, yPos),
                Size = new System.Drawing.Size(100, 20)
            };

            voltageCombo = new ComboBox
            {
                Location = new System.Drawing.Point(130, yPos),
                Size = new System.Drawing.Size(200, 25),
                DropDownStyle = ComboBoxStyle.DropDownList
            };
            voltageCombo.Items.AddRange(new string[] { "120V", "208V", "240V", "277V", "480V" });
            voltageCombo.SelectedIndex = 1; // Default to 208V

            yPos += 40;

            // Code Edition
            var codeLabel = new Label
            {
                Text = "Code Edition:",
                Location = new System.Drawing.Point(20, yPos),
                Size = new System.Drawing.Size(100, 20)
            };

            codeEditionCombo = new ComboBox
            {
                Location = new System.Drawing.Point(130, yPos),
                Size = new System.Drawing.Size(200, 25),
                DropDownStyle = ComboBoxStyle.DropDownList
            };
            codeEditionCombo.Items.AddRange(new string[] { "NEC 2023", "NEC 2020", "NEC 2017" });
            codeEditionCombo.SelectedIndex = 0;

            yPos += 40;

            // Options checkboxes
            includeReceptaclesCheck = new CheckBox
            {
                Text = "Include Receptacle Loads",
                Location = new System.Drawing.Point(20, yPos),
                Size = new System.Drawing.Size(200, 25),
                Checked = true
            };

            yPos += 30;

            applyDemandFactorsCheck = new CheckBox
            {
                Text = "Apply NEC Demand Factors",
                Location = new System.Drawing.Point(20, yPos),
                Size = new System.Drawing.Size(200, 25),
                Checked = true
            };

            yPos += 30;

            useCustomFactorsCheck = new CheckBox
            {
                Text = "Use Custom Demand Factors",
                Location = new System.Drawing.Point(20, yPos),
                Size = new System.Drawing.Size(200, 25),
                Checked = false
            };
            useCustomFactorsCheck.CheckedChanged += UseCustomFactorsCheck_CheckedChanged;

            yPos += 40;

            // Custom demand factors group
            demandFactorsGroup = new GroupBox
            {
                Text = "Custom Demand Factors",
                Location = new System.Drawing.Point(20, yPos),
                Size = new System.Drawing.Size(400, 120),
                Enabled = false
            };

            var lightingLabel = new Label
            {
                Text = "Lighting:",
                Location = new System.Drawing.Point(20, 25),
                Size = new System.Drawing.Size(80, 20)
            };

            lightingFactorText = new TextBox
            {
                Location = new System.Drawing.Point(100, 22),
                Size = new System.Drawing.Size(60, 25),
                Text = "1.00"
            };

            var receptacleLabel = new Label
            {
                Text = "Receptacles:",
                Location = new System.Drawing.Point(180, 25),
                Size = new System.Drawing.Size(80, 20)
            };

            receptacleFactorText = new TextBox
            {
                Location = new System.Drawing.Point(270, 22),
                Size = new System.Drawing.Size(60, 25),
                Text = "1.00"
            };

            var hvacLabel = new Label
            {
                Text = "HVAC:",
                Location = new System.Drawing.Point(20, 55),
                Size = new System.Drawing.Size(80, 20)
            };

            hvacFactorText = new TextBox
            {
                Location = new System.Drawing.Point(100, 52),
                Size = new System.Drawing.Size(60, 25),
                Text = "1.00"
            };

            var factorNote = new Label
            {
                Text = "Note: 1.00 = 100%, 0.75 = 75%, etc.",
                Location = new System.Drawing.Point(20, 85),
                Size = new System.Drawing.Size(250, 20),
                ForeColor = System.Drawing.Color.Gray
            };

            demandFactorsGroup.Controls.AddRange(new Control[] 
            { 
                lightingLabel, lightingFactorText, 
                receptacleLabel, receptacleFactorText,
                hvacLabel, hvacFactorText,
                factorNote
            });

            yPos += 130;

            // Buttons
            okButton = new Button
            {
                Text = "Calculate Loads",
                Location = new System.Drawing.Point(250, yPos),
                Size = new System.Drawing.Size(120, 35),
                DialogResult = DialogResult.OK
            };
            okButton.Click += OkButton_Click;

            cancelButton = new Button
            {
                Text = "Cancel",
                Location = new System.Drawing.Point(300, yPos),
                Size = new System.Drawing.Size(80, 35),
                DialogResult = DialogResult.Cancel
            };

            this.Controls.AddRange(new Control[] 
            { 
                buildingTypeLabel, buildingTypeCombo,
                voltageLabel, voltageCombo,
                codeLabel, codeEditionCombo,
                includeReceptaclesCheck,
                applyDemandFactorsCheck,
                useCustomFactorsCheck,
                demandFactorsGroup,
                okButton, 
                cancelButton 
            });

            this.AcceptButton = okButton;
            this.CancelButton = cancelButton;
        }

        private void LoadDefaults()
        {
            buildingTypeCombo.SelectedItem = "Office";
            voltageCombo.SelectedItem = "208V";
            codeEditionCombo.SelectedItem = "NEC 2023";
        }

        private void UseCustomFactorsCheck_CheckedChanged(object sender, EventArgs e)
        {
            demandFactorsGroup.Enabled = useCustomFactorsCheck.Checked;
            applyDemandFactorsCheck.Enabled = !useCustomFactorsCheck.Checked;
        }

        private void OkButton_Click(object sender, EventArgs e)
        {
            try
            {
                CalculationOptions = new CalculationOptions
                {
                    BuildingType = (BuildingType)Enum.Parse(typeof(BuildingType), buildingTypeCombo.SelectedItem.ToString()),
                    SystemVoltage = ParseVoltage(voltageCombo.SelectedItem.ToString()),
                    CodeEdition = codeEditionCombo.SelectedItem.ToString(),
                    IncludeReceptacles = includeReceptaclesCheck.Checked,
                    ApplyDemandFactors = applyDemandFactorsCheck.Checked,
                    UseCustomDemandFactors = useCustomFactorsCheck.Checked
                };

                if (useCustomFactorsCheck.Checked)
                {
                    CalculationOptions.CustomDemandFactors = new Dictionary<LoadType, double>
                    {
                        { LoadType.Lighting, ParseFactor(lightingFactorText.Text) },
                        { LoadType.Receptacles, ParseFactor(receptacleFactorText.Text) },
                        { LoadType.HVAC, ParseFactor(hvacFactorText.Text) }
                    };
                }

                // Validate inputs
                if (CalculationOptions.SystemVoltage <= 0)
                {
                    MessageBox.Show("Invalid voltage selection.", "Error", 
                        MessageBoxButtons.OK, MessageBoxIcon.Error);
                    this.DialogResult = DialogResult.None;
                    return;
                }

                if (useCustomFactorsCheck.Checked)
                {
                    foreach (var factor in CalculationOptions.CustomDemandFactors.Values)
                    {
                        if (factor <= 0 || factor > 1.5)
                        {
                            MessageBox.Show("Custom demand factors must be between 0.1 and 1.5", "Error",
                                MessageBoxButtons.OK, MessageBoxIcon.Error);
                            this.DialogResult = DialogResult.None;
                            return;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error processing options: {ex.Message}", "Error",
                    MessageBoxButtons.OK, MessageBoxIcon.Error);
                this.DialogResult = DialogResult.None;
            }
        }

        private double ParseVoltage(string voltageString)
        {
            var voltage = voltageString.Replace("V", "");
            return double.Parse(voltage);
        }

        private double ParseFactor(string factorString)
        {
            if (double.TryParse(factorString, out double factor))
                return factor;
            return 1.0;
        }
    }
}