import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
  Link,
} from "@react-pdf/renderer";
import { BorrowedBook } from "@/types";
import { formatShortDate, calculateDaysLeft } from "@/lib/util";

// Register fonts
Font.register({
  family: "Inter",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZg.ttf",
    },
    {
      src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYMZg.ttf",
      fontWeight: 700,
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Inter",
    backgroundColor: "#232839",
    width: "100%",
  },
  header: {
    marginBottom: 24,
  },
  image: {
    width: 40,
    height: 32,
  },
  logo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  subTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  subtitleWrapper: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#E2E8F0",
  },
  subInnerTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#E7C9A5",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
    flexWrap: "wrap",
  },
  col: {
    flex: 1,
    minWidth: 200,
    padding: 12,
    borderWidth: 1,
    borderColor: "#3A4256", // Dark gray border instead of green
    borderRadius: 6,
    backgroundColor: "#2D3448", // Slightly darker background for columns
  },
  label: {
    fontSize: 12,
    color: "#A0AEC0",
    marginBottom: 4,
  },
  value: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  footer: {
    marginTop: 24,
    fontSize: 12,
    color: "#A0AEC0",
    textAlign: "center",
  },
  footerLink: {
    color: "#E7C9A5", // Gold accent color
    textDecoration: "underline",
    marginTop: 4,
  },
  footerText: {
    marginTop: 4,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#3A4256", // Dark gray divider
    marginVertical: 16,
  },
  termItem: {
    flexDirection: "row",
    marginBottom: 8,
    alignItems: "flex-start",
  },
  termBullet: {
    fontSize: 14,
    color: "#E7C9A5",
    marginRight: 8,
  },
  termText: {
    fontSize: 14,
    color: "#E2E8F0",
    flex: 1,
  },
});

export const ReceiptPDF = ({ book }: { book: BorrowedBook }) => {
  const daysLeft = calculateDaysLeft(book.borrowRecord.dueDate);
  const isOverdue = daysLeft < 0;
  const duration = Math.ceil(
    (new Date(book.borrowRecord.dueDate).getTime() -
      new Date(book.borrowRecord.borrowDate).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.logo}>
            <Image src="/images/logo.png" style={styles.image} />
            <Text style={styles.title}>BookWise</Text>
          </View>
          <Text style={styles.subTitle}>Borrow Receipt</Text>

          <View style={styles.subtitleWrapper}>
            <Text style={styles.subtitle}>Receipt ID:</Text>
            <Text style={styles.subInnerTitle}>#{book.borrowRecord._id}</Text>
          </View>

          <View style={styles.subtitleWrapper}>
            <Text style={styles.subtitle}>Date Issued:</Text>
            <Text style={styles.subInnerTitle}>
              {formatShortDate(new Date().toISOString())}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View>
          <Text style={styles.sectionTitle}>Book Details:</Text>

          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.label}>Title</Text>
              <Text style={styles.value}>{book.bookDetail.title}</Text>
            </View>

            <View style={styles.col}>
              <Text style={styles.label}>Author</Text>
              <Text style={styles.value}>{book.bookDetail.author}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.label}>Genre</Text>
              <Text style={styles.value}>{book.bookDetail.genre}</Text>
            </View>

            <View style={styles.col}>
              <Text style={styles.label}>Borrowed on</Text>
              <Text style={styles.value}>
                {formatShortDate(book.borrowRecord.borrowDate)}
              </Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.label}>Due Date</Text>
              <Text
                style={[styles.value, isOverdue ? { color: "#F56565" } : {}]}
              >
                {formatShortDate(book.borrowRecord.dueDate)}
              </Text>
            </View>

            <View style={styles.col}>
              <Text style={styles.label}>Duration</Text>
              <Text style={styles.value}>{duration} days</Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        <View>
          <Text style={styles.sectionTitle}>Terms</Text>
          <View style={styles.termItem}>
            <Text style={styles.termBullet}>•</Text>
            <Text style={styles.termText}>
              Please return the book by the due date.
            </Text>
          </View>
          <View style={styles.termItem}>
            <Text style={styles.termBullet}>•</Text>
            <Text style={styles.termText}>
              Lost or damaged books may incur replacement costs.
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.footer}>
          <Text style={styles.footerText}>Thank you for using BookWise!</Text>
          <Link
            style={styles.footerLink}
            src="https://university-library-ac9s.vercel.app/"
          >
            Website: university-library-ac9s.vercel.app
          </Link>
          <Link
            style={styles.footerLink}
            src="mailto:jerryrawlings892@gmail.com"
          >
            Email: jerryrawlings892@gmail.com
          </Link>
        </View>
      </Page>
    </Document>
  );
};
