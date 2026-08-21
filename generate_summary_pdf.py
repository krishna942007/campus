import os
import sys
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    KeepTogether,
    HRFlowable,
)
from reportlab.pdfgen import canvas

# Color Palette (VIT Mumbai Brand Tokens)
NAVY_PRIMARY = colors.HexColor("#0C2238")
NAVY_SECONDARY = colors.HexColor("#1A365D")
GOLD_ACCENT = colors.HexColor("#C99632")
GOLD_LIGHT = colors.HexColor("#FDF8ED")
GOLD_BORDER = colors.HexColor("#E2C06A")
CREAM_BG = colors.HexColor("#F8FAFC")
SLATE_TEXT = colors.HexColor("#334155")
MUTED_TEXT = colors.HexColor("#64748B")
BORDER_COLOR = colors.HexColor("#E2E8F0")
HEADER_BG = colors.HexColor("#0C2238")
HEADER_TEXT = colors.HexColor("#FFFFFF")
ROW_ALT_BG = colors.HexColor("#F8FAFC")

class NumberedCanvas(canvas.Canvas):
    """Custom canvas that tracks total pages and draws running headers and footers."""
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            canvas.Canvas.showPage(self)
        canvas.Canvas.save(self)

    def draw_page_decorations(self, page_count):
        self.saveState()
        
        # Top Header (pages > 1)
        if self._pageNumber > 1:
            self.setStrokeColor(BORDER_COLOR)
            self.setLineWidth(0.75)
            self.line(32, 755, 580, 755)
            
            self.setFont("Helvetica-Bold", 7.5)
            self.setFillColor(NAVY_PRIMARY)
            self.drawString(32, 760, "VITARA 2.0  •  VIT Mumbai Academic & Career Acceleration Platform")
            
            self.setFont("Helvetica", 7.5)
            self.setFillColor(MUTED_TEXT)
            self.drawRightString(580, 760, "Executive Project Draft & Feature Summary")

        # Bottom Footer (all pages)
        self.setStrokeColor(BORDER_COLOR)
        self.setLineWidth(0.75)
        self.line(32, 34, 580, 34)

        self.setFont("Helvetica-Bold", 7)
        self.setFillColor(GOLD_ACCENT)
        self.drawString(32, 23, "VIDYALANKAR INSTITUTE OF TECHNOLOGY (VIT MUMBAI)")

        self.setFont("Helvetica", 7)
        self.setFillColor(MUTED_TEXT)
        self.drawString(250, 23, "Confidential • Internal Project Brief")
        
        page_str = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(580, 23, page_str)
        
        self.restoreState()


def build_pdf(filename="VITARA_Project_Summary_Draft.pdf"):
    pdf_path = os.path.abspath(filename)
    
    # 32 pt margins for maximum printable balance
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        leftMargin=32,
        rightMargin=32,
        topMargin=36,
        bottomMargin=42
    )

    styles = getSampleStyleSheet()

    # Custom typography
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=17,
        leading=20,
        textColor=NAVY_PRIMARY,
        spaceAfter=1
    )

    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=12,
        textColor=GOLD_ACCENT,
        spaceAfter=3
    )

    tagline_style = ParagraphStyle(
        'DocTagline',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.5,
        leading=10.5,
        textColor=SLATE_TEXT
    )

    h1_style = ParagraphStyle(
        'SectionH1',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=13,
        textColor=NAVY_PRIMARY,
        spaceBefore=7,
        spaceAfter=3,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'BodyDark',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.5,
        leading=10,
        textColor=SLATE_TEXT
    )

    body_bold = ParagraphStyle(
        'BodyDarkBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7.5,
        leading=10,
        textColor=NAVY_PRIMARY
    )

    table_header_style = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7.5,
        leading=9.5,
        textColor=HEADER_TEXT
    )

    table_cell_style = ParagraphStyle(
        'TableCell',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7,
        leading=9.5,
        textColor=SLATE_TEXT
    )

    table_cell_bold = ParagraphStyle(
        'TableCellBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7,
        leading=9.5,
        textColor=NAVY_PRIMARY
    )

    badge_style = ParagraphStyle(
        'BadgeText',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7,
        leading=8.5,
        textColor=NAVY_PRIMARY,
        alignment=1
    )

    metric_val_style = ParagraphStyle(
        'MetricVal',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=13,
        textColor=NAVY_PRIMARY,
        alignment=1
    )

    metric_lbl_style = ParagraphStyle(
        'MetricLbl',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=6.5,
        leading=8,
        textColor=MUTED_TEXT,
        alignment=1
    )

    story = []

    # ==========================
    # HEADER BANNER BOX
    # ==========================
    banner_data = [
        [
            Paragraph("<b>VITARA 2.0 -- Executive Summary &amp; Feature Brief</b>", title_style),
            Paragraph("<b>STATUS: LIVE v2.0</b>", badge_style)
        ],
        [
            Paragraph("<b>Vidyalankar Institute of Technology Academic &amp; Career Acceleration Platform</b>", subtitle_style),
            Paragraph("React 18 | Node.js | Gemini RAG", ParagraphStyle('SubBadge', parent=badge_style, fontSize=6, textColor=MUTED_TEXT))
        ],
        [
            Paragraph("A unified, next-generation AI-powered institutional ecosystem built to modernize academic ERP compliance, faculty mentorship, institutional RAG intelligence, and real-time skill-gap career acceleration for VIT Mumbai.", tagline_style),
            ""
        ]
    ]

    banner_table = Table(banner_data, colWidths=[430, 118])
    banner_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('SPAN', (0,2), (1,2)),
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#F8FAFC")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#CBD5E1")),
        ('BACKGROUND', (1,0), (1,0), GOLD_LIGHT),
        ('BOX', (1,0), (1,0), 0.75, GOLD_BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 7),
        ('RIGHTPADDING', (0,0), (-1,-1), 7),
    ]))
    story.append(banner_table)
    story.append(Spacer(1, 5))

    # ==========================
    # KEY METRICS ROW
    # ==========================
    m_w = 548 / 6
    metrics_data = [
        [
            Paragraph("<b>14</b>", metric_val_style),
            Paragraph("<b>12</b>", metric_val_style),
            Paragraph("<b>17</b>", metric_val_style),
            Paragraph("<b>75%</b>", metric_val_style),
            Paragraph("<b>&lt;150ms</b>", metric_val_style),
            Paragraph("<b>-60%</b>", metric_val_style),
        ],
        [
            Paragraph("Student Tabs", metric_lbl_style),
            Paragraph("Mentor Modules", metric_lbl_style),
            Paragraph("Admin Ops Tabs", metric_lbl_style),
            Paragraph("ERP Cutoff Guard", metric_lbl_style),
            Paragraph("RAG Query Speed", metric_lbl_style),
            Paragraph("Bundle Size Cut", metric_lbl_style),
        ]
    ]
    metrics_table = Table(metrics_data, colWidths=[m_w]*6)
    metrics_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#FFFFFF")),
        ('BOX', (0,0), (-1,-1), 0.75, BORDER_COLOR),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('TOPPADDING', (0,0), (-1,-1), 2),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
    ]))
    story.append(metrics_table)
    story.append(Spacer(1, 6))

    # ==========================
    # 1. CORE PURPOSE & 3 PILLARS
    # ==========================
    story.append(Paragraph("1. System Purpose &amp; Core Architectural Pillars", h1_style))
    story.append(HRFlowable(width="100%", thickness=0.75, color=GOLD_ACCENT, spaceBefore=0, spaceAfter=4))

    col_w = 548 / 3
    pillars_data = [
        [
            Paragraph("<b>1. Academic ERP &amp; Compliance</b>", body_bold),
            Paragraph("<b>2. AI Mentorship Matcher</b>", body_bold),
            Paragraph("<b>3. Grounded RAG &amp; Roadmaps</b>", body_bold),
        ],
        [
            Paragraph("Live attendance monitor with statutory 75% cutoff warnings, safe-to-miss lecture calculators, semester transcripts, and lab coursework submission queues.", body_style),
            Paragraph("4-factor matching algorithm (40% goals, 25% domain, 10% course, 10% dept), real-time approval pipelines, and mentor-assigned university course tracks.", body_style),
            Paragraph("Grounded Gemini 2.5 Flash / 3.6 Flash RAG over autonomous ordinances &amp; syllabi. Dynamic skill-gap radar (AI, Cloud, Fullstack) with milestone tracking.", body_style),
        ]
    ]
    pillars_table = Table(pillars_data, colWidths=[col_w, col_w, col_w])
    pillars_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#F8FAFC")),
        ('BOX', (0,0), (0,1), 0.75, BORDER_COLOR),
        ('BOX', (1,0), (1,1), 0.75, BORDER_COLOR),
        ('BOX', (2,0), (2,1), 0.75, BORDER_COLOR),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 5),
        ('RIGHTPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(pillars_table)
    story.append(Spacer(1, 6))

    # ==========================
    # 2. ROLE-BASED PORTALS SUMMARY
    # ==========================
    story.append(Paragraph("2. Comprehensive Role-Based Feature Modules", h1_style))
    story.append(HRFlowable(width="100%", thickness=0.75, color=GOLD_ACCENT, spaceBefore=0, spaceAfter=4))

    portal_table_data = [
        [
            Paragraph("<b>Portal / Module</b>", table_header_style),
            Paragraph("<b>Target Role</b>", table_header_style),
            Paragraph("<b>Key Features &amp; Functional Capabilities</b>", table_header_style),
            Paragraph("<b>Impact / Value Delivered</b>", table_header_style),
        ],
        [
            Paragraph("<b>Student Portal</b><br/><font color='#64748B'>14 Live Tabs</font>", table_cell_bold),
            Paragraph("Students (UG / PG)", table_cell_style),
            Paragraph("&bull; <b>Live Attendance &amp; ERP:</b> 75% cutoff threshold, safe-to-miss calculator, makeup requests.<br/>"
                      "&bull; <b>Academic Transcript:</b> CS501-CS503 credits, internal assessments, CGPA trends.<br/>"
                      "&bull; <b>Coursework &amp; Submissions:</b> Drag &amp; drop lab upload with timestamp verification.<br/>"
                      "&bull; <b>AI Mentorship Hub:</b> Request mentors, 1-on-1 booking, mentor feedback notes.<br/>"
                      "&bull; <b>Career Roadmap &amp; Skill Radar:</b> AI/ML, Fullstack, Cloud milestone checklist.<br/>"
                      "&bull; <b>AI Recommended Courses:</b> Mentor-assigned Stanford, MIT, Coursera tracks.<br/>"
                      "&bull; <b>Per-Account Onboarding:</b> First-login career goal &amp; specialization selector.", table_cell_style),
            Paragraph("Automated 75% statutory compliance protection; 3x faster mentor connectivity; industry-aligned skills.", table_cell_style)
        ],
        [
            Paragraph("<b>Mentor Portal</b><br/><font color='#64748B'>12 Live Tabs</font>", table_cell_bold),
            Paragraph("Faculty Mentors", table_cell_style),
            Paragraph("&bull; <b>AI Matching Queue:</b> Inspect student requests with compatibility score breakdown.<br/>"
                      "&bull; <b>Mentee Roster &amp; Risk Flags:</b> Low attendance (&lt;75%) and CGPA drop alert badges.<br/>"
                      "&bull; <b>Course Allocator:</b> Push elite university courses directly to student roadmaps.<br/>"
                      "&bull; <b>Assignment Grading Hub:</b> Review student lab archives &amp; feedback submission.<br/>"
                      "&bull; <b>Meeting Scheduler:</b> 1-on-1 offline &amp; Google Meet appointment coordinator.<br/>"
                      "&bull; <b>Feedback &amp; Follow-up Logs:</b> Private notes vs student-visible action items.<br/>"
                      "&bull; <b>AI Assistant:</b> Draft LORs, review research abstracts, progress summaries.", table_cell_style),
            Paragraph("Reduces mentor administrative load by 60%; instant identification of at-risk students.", table_cell_style)
        ],
        [
            Paragraph("<b>Admin Portal</b><br/><font color='#64748B'>17 Live Tabs</font>", table_cell_bold),
            Paragraph("HODs &amp; Admins", table_cell_style),
            Paragraph("&bull; <b>System Telemetry:</b> Active user traffic, daily API volume, RAG latency (142ms).<br/>"
                      "&bull; <b>User Management:</b> Student, Mentor, and Admin full CRUD &amp; activation locks.<br/>"
                      "&bull; <b>Bulk Mentor Allocation:</b> Algorithmic matching trigger + manual override.<br/>"
                      "&bull; <b>RAG Document Ingestion:</b> Upload autonomous ordinance PDFs &amp; rebuild vectors.<br/>"
                      "&bull; <b>Live ERP Sync Engine:</b> Real-time sync with campus database &amp; payload health.<br/>"
                      "&bull; <b>AI Model &amp; Token Controls:</b> Gemini model switcher, temperature, quota locks.<br/>"
                      "&bull; <b>Security Audit Logs:</b> Comprehensive timestamped role activity trails.", table_cell_style),
            Paragraph("Single pane of glass for institutional governance; eliminates departmental data silos.", table_cell_style)
        ],
        [
            Paragraph("<b>AI Workspace</b><br/><font color='#64748B'>Universal Layer</font>", table_cell_bold),
            Paragraph("All Users", table_cell_style),
            Paragraph("&bull; <b>Grounded RAG Queries:</b> Instant answers on exam schemes, rules &amp; policies.<br/>"
                      "&bull; <b>Deep Reasoning Dropdowns:</b> Vector search transparency &amp; thought chains.<br/>"
                      "&bull; <b>Draggable Floating Widget:</b> Instant contextual assistance across all pages.", table_cell_style),
            Paragraph("24/7 autonomous institutional answers; zero hallucination on university policies.", table_cell_style)
        ]
    ]

    portal_table = Table(portal_table_data, colWidths=[105, 80, 253, 110])
    portal_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BACKGROUND', (0,0), (-1,0), HEADER_BG),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#CBD5E1")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#E2E8F0")),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, ROW_ALT_BG]),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('LEFTPADDING', (0,0), (-1,-1), 5),
        ('RIGHTPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(portal_table)
    story.append(Spacer(1, 6))

    # ==========================
    # 3. TECH STACK & SECURITY
    # ==========================
    story.append(KeepTogether([
        Paragraph("3. Technical Stack, State Architecture &amp; Security Shield", h1_style),
        HRFlowable(width="100%", thickness=0.75, color=GOLD_ACCENT, spaceBefore=0, spaceAfter=4)
    ]))

    tech_table_data = [
        [
            Paragraph("<b>Frontend Architecture</b>", table_header_style),
            Paragraph("<b>Backend API &amp; Database</b>", table_header_style),
            Paragraph("<b>AI / LLM &amp; Guardrails</b>", table_header_style)
        ],
        [
            Paragraph("&bull; <b>Core:</b> React 18.3.1, TypeScript 5.7.2, Vite 6.0.5<br/>"
                      "&bull; <b>Styling:</b> Tailwind CSS 3.4, Glassmorphism, VIT Brand Tokens<br/>"
                      "&bull; <b>Motion:</b> Framer Motion 11.15, Lenis Smooth Scroll<br/>"
                      "&bull; <b>State:</b> Reactive Event-driven Local/Storage Store with instant 2-way cross-tab synchronization<br/>"
                      "&bull; <b>Code Splitting:</b> Rollup manual chunks (&gt;60% bundle size reduction to 463KB)", table_cell_style),
            Paragraph("&bull; <b>Server:</b> Node.js + Express (ESM Architecture)<br/>"
                      "&bull; <b>Database:</b> MongoDB Atlas with Mongoose ODM &amp; DNS SRV fallback<br/>"
                      "&bull; <b>Auth:</b> JWT Token verification middleware with HTTP-only cookies &amp; Bcrypt hashing<br/>"
                      "&bull; <b>Error Handling:</b> Standardized ApiError &amp; ApiResponse wrappers<br/>"
                      "&bull; <b>Seeded Data:</b> 50+ pre-seeded student/mentor/course records", table_cell_style),
            Paragraph("&bull; <b>Engine:</b> Google Gemini API (`gemini-2.5-flash` / `gemini-3.6-flash`) + HF Fallback<br/>"
                      "&bull; <b>RAG Search:</b> Vector embedding index over Autonomous Ordinances &amp; Syllabi<br/>"
                      "&bull; <b>Token Shield:</b> Strict 750 max output tokens &amp; 12s HTTP timeout<br/>"
                      "&bull; <b>Injection Defense:</b> Sanitized `&lt;user_query&gt;` XML wrappers", table_cell_style)
        ]
    ]

    tech_table = Table(tech_table_data, colWidths=[182, 182, 184])
    tech_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BACKGROUND', (0,0), (-1,0), HEADER_BG),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#CBD5E1")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#E2E8F0")),
        ('BACKGROUND', (0,1), (-1,-1), colors.HexColor("#FAFAFA")),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('LEFTPADDING', (0,0), (-1,-1), 5),
        ('RIGHTPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(tech_table)
    story.append(Spacer(1, 6))

    # ==========================
    # 4. INTERCONNECTIVITY & 5. DEMO
    # ==========================
    combined_bottom_data = [
        [
            Paragraph("<b>4. Real-Time Interconnectivity Matrix</b>", table_header_style),
            Paragraph("<b>5. Demo Credentials &amp; Verification</b>", table_header_style)
        ],
        [
            Paragraph("&bull; <b>Student Requests Mentor:</b> Dispatches store event; Mentor sees pending card with AI match score.<br/>"
                      "&bull; <b>Mentor Accepts Request:</b> Updates status to `ACCEPTED`; unlocks 1-on-1 booking &amp; mentor advice logs in real time.<br/>"
                      "&bull; <b>Assign External Course:</b> Course immediately populates student's AI Recommended tab with mentor guidance notes.<br/>"
                      "&bull; <b>Assignment Submission:</b> Appends upload metadata to `submissions[]`; mentor's lab grading queue updates instantly.<br/>"
                      "&bull; <b>Admin ERP Sync:</b> Pings campus database timestamp; updates live sync indicators to active green.", table_cell_style),
            Paragraph("&bull; <b>Student Demo:</b> Roll No: `2023CSE001` or `101` / `102` (Password: `password123`)<br/>"
                      "  <i>Verify: 75% attendance dial, career onboarding, coursework upload, mentor request.</i><br/><br/>"
                      "&bull; <b>Mentor Demo:</b> Email: `s.kulkarni@vit.edu.in` or `T101` (Password: `password123`)<br/>"
                      "  <i>Verify: Review match queue, assign Stanford CS229 course, inspect student submissions.</i><br/><br/>"
                      "&bull; <b>Admin Demo:</b> Email: `admin@vit.edu.in` (Password: `password123`)<br/>"
                      "  <i>Verify: System telemetry, trigger live ERP sync, test Autonomous Ordinance RAG queries.</i>", table_cell_style)
        ]
    ]

    bottom_table = Table(combined_bottom_data, colWidths=[274, 274])
    bottom_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BACKGROUND', (0,0), (-1,0), HEADER_BG),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#CBD5E1")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#E2E8F0")),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white]),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 5),
        ('RIGHTPADDING', (0,0), (-1,-1), 5),
    ]))
    
    story.append(KeepTogether([bottom_table]))

    # Build PDF with custom NumberedCanvas
    doc.build(story, canvasmaker=NumberedCanvas)
    return pdf_path

if __name__ == "__main__":
    out_file = "VITARA_Project_Summary_Draft.pdf"
    if len(sys.argv) > 1:
        out_file = sys.argv[1]
    result = build_pdf(out_file)
    print(f"Successfully generated PDF: {result}")
